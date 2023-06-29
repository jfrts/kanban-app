import { Board } from "../entity/Board";

export interface BoardRepository {
    findAll(): Promise<Board[]>;
    get(id: number): Promise<Board>;
}

export type PositionMapInput = {
    idBoard: number,
    positionMap: {
        [idColumn: number]: number[],
    }
}