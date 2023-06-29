import { Board } from "../entities/Board";
import { Card } from "../entities/Card";
import { Column } from "../entities/Column";
import { HttpClient } from "../infra/http/HttpClient";
import { BoardService, ColumnInput, PositionMapInput, SaveCardInput } from "./BoardService";

export class BoardServiceHttp implements BoardService {
    constructor(readonly baseUrl: string, readonly httpClient: HttpClient) {
    };

    async getBoards(): Promise<Board[]> {
        const response = await this.httpClient.get(`${this.baseUrl}/boards`);
        const boardsData = response as Board[];
        return boardsData;
    }

    async getBoard(idBoard: number): Promise<Board> {
        const response = await this.httpClient.get(
            `${this.baseUrl}/boards/${idBoard}`
        );
        const boardData = response;
        const board = new Board(idBoard, boardData.name);
        for (const columnData of boardData.columns) {
            const column = new Column(columnData.name, columnData.hasEstimative)
            column.idColumn = columnData.id;
            board.columns.push(column);
            for (const cardData of columnData.cards) {
                const card = new Card(cardData.title, cardData.estimative);
				card.idCard = cardData.id;
				column.cards.push(card);
            }
        }
        return board;
    }

    async saveColumn(column: ColumnInput): Promise<number> {
        const response = await this.httpClient.post(
            `${this.baseUrl}/boards/${column.idBoard}/columns`,
            column
        );
        return response;
    }

    async deleteColumn(idBoard: number, idColumn: number): Promise<void> {
        await this.httpClient.delete(
            `${this.baseUrl}/boards/${idBoard}/columns/${idColumn}`
        );
    }

    async saveCard(card: SaveCardInput): Promise<number> {
		const idCard = await this.httpClient.post(`${this.baseUrl}/boards/${card.idBoard}/columns/${card.idColumn}/cards`, card);
		return idCard;
	}

    async deleteCard(idBoard: number, idColumn: number, idCard: number): Promise<void> {
        await this.httpClient.delete(
            `${this.baseUrl}/boards/${idBoard}/columns/${idColumn}/cards/${idCard}`
        );
    }

    async updatePositionMap({idBoard, positionMap}: PositionMapInput): Promise<void> {
		await this.httpClient.post(`${this.baseUrl}/boards/${idBoard}/updatePositionMap`, positionMap);
    }
}