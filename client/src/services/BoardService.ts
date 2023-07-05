import { Board } from "../entities/Board";

export interface BoardService {
    getBoard(idBoard: number): Promise<Board>;
    getBoards(): Promise<Board[]>;
    saveBoard(board: BoardInput): Promise<number>;
    saveColumn(column: ColumnInput): Promise<number>;
    deleteColumn(idBoard: number, idColumn: number): Promise<void>;
    saveCard(card: SaveCardInput): Promise<number>;
    deleteCard(idBoard: number, idColumn: number, idCard: number): Promise<void>;
    updateCard(card: UpdateCardInput): Promise<void>;
    updatePositionMap(input: { idBoard: number, positionMap: { [idColumn: number]: number[] } }): Promise<void>;
}

export type BoardInput = {
    name: string
}

export type ColumnInput = {
    idBoard: number,
    name: string,
    hasEstimative: boolean
}

export type SaveCardInput = {
    idBoard: number,
    idColumn: number,
    title: string,
    estimative: number
}

export type UpdateCardInput = {
    idBoard: number,
    idColumn: number,
    idCard: number,
    title: string,
    estimative: number
}

export type PositionMapInput = { 
    idBoard: number; 
    positionMap: { [idColumn: number]: number[]; }; 
}