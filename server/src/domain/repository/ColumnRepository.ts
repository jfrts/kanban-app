import { Column } from "../entity/Column";

export interface ColumnRepository {
    findAllByBoardId(id: number): Promise<Column[]>;
    get(id: number): Promise<Column>;
    save(column: Column): Promise<number>;
    delete(id: number): Promise<void>;
}