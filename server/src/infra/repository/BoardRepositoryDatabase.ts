import { Board } from "../../domain/entity/Board";
import { BoardRepository, PositionMapInput } from "../../domain/repository/BoardRepository";
import { Connection } from "../database/Connection";

export class BoardRepositoryDatabase implements BoardRepository {

    constructor(readonly connection: Connection) { };

    async findAll(): Promise<Board[]> {
        const boardsData = await this.connection.query(
            "select id_board, name from branas.board",
            []
        );
        const boards: Board[] = [];
        for (const boardData of boardsData) {
            const board = new Board(boardData.id_board, boardData.name);
            boards.push(board);
        }
        return boards;
    }

    async get(id: number): Promise<Board> {
        const [boardData] = await this.connection.query(
            "select id_board, name from branas.board where id_board = $1",
            [id]
        );
        if (!boardData) {
            throw new Error("Board not found");
        }
        const board = new Board(boardData.id_board, boardData.name);
        return board;
    }
}