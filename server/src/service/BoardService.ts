import { Board } from "../domain/entity/Board";
import { BoardRepository } from "../domain/repository/BoardRepository";
import { CardRepository } from "../domain/repository/CardRepository";
import { ColumnRepository } from "../domain/repository/ColumnRepository";

export class BoardService {
    constructor(
        readonly boardRepository: BoardRepository,
        readonly columnRepository: ColumnRepository,
        readonly cardRepository: CardRepository
    ) { };

    async getBoards(): Promise<Board[]> {
        return this.boardRepository.findAll();
    }

    async getBoard(id: number): Promise<BoardOutput> {
        const board = await this.boardRepository.get(id);
        const output: BoardOutput = {
            id: board.id,
            name: board.name,
            estimative: 0,
            columns: []
        }
        const columns = await this.columnRepository.findAllByBoardId(id);
        for (const column of columns) {
            if (!column.id) continue;
            const cards = await this.cardRepository.findAllByColumnId(column.id);
            const cardsOutput: CardOutput[] = cards.map(card => ({
                id: card.id,
                title: card.title,
                estimative: card.estimative
            }));
            const estimative = cards
                .map(card => card.estimative)
                .reduce((accumulator, current) => accumulator + current, 0);
            const columnOutput: ColumnOutput = {
                id: column.id,
                name: column.name,
                hasEstimative: column.hasEstimative,
                estimative,
                cards: cardsOutput
            };
            output.columns.push(columnOutput);
            output.estimative += estimative;
        }
        return output;
    }

    async updatePositionMap(input: PositionMapInput): Promise<void> {
        for (const idColumn in input) {
            let index = 0;
            for (const idCard of input[idColumn]) {
                await this.cardRepository.updateIdColumnAndIndex(idCard, Number(idColumn), index++);
            }
        }
    }
}

type CardOutput = {
    id?: number
    title: string,
    estimative: number
}

type ColumnOutput = {
    id?: number,
    name: string,
    estimative: number,
    hasEstimative: boolean,
    cards: CardOutput[]
}

type BoardOutput = {
    id?: number,
    name: string,
    estimative: number,
    columns: ColumnOutput[]
}

type PositionMapInput = {
    [idColumn: number]: number[],
}