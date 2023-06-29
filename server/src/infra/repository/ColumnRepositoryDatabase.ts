import { Column } from "../../domain/entity/Column";
import { ColumnRepository } from "../../domain/repository/ColumnRepository";
import { Connection } from "../database/Connection";

export class ColumnRepositoryDatabase implements ColumnRepository {
    constructor(readonly connection: Connection) { }

    async findAllByBoardId(id: number): Promise<Column[]> {
        const columnsData = await this.connection.query(
            "select id_board, id_column, name, has_estimative from branas.column where id_board = $1",
            [id]
        );
        const columns: Column[] = [];
        for (const columnData of columnsData) {
            columns.push(new Column(columnData.id_board, columnData.id_column, columnData.name, columnData.has_estimative));
        }
        return columns;
    }

    async get(id: number): Promise<Column> {
        const [columnData] = await this.connection.query(
            "select id_board, id_column, name, has_estimative from branas.column where id_column = $1",
            [id]
        );
        if (!columnData) {
            throw new Error("Column not found");
        }
        const column = new Column(columnData.id_board, columnData.id, columnData.name, columnData.has_estimative);
        return column;
    }

    async save(column: Column): Promise<number> {
        const [columnData] = await this.connection.query(
            "insert into branas.column (id_board, name, has_estimative) values ($1, $2, $3) returning id_column",
            [column.idBoard, column.name, column.hasEstimative]
        );
        return columnData.id_column;
    }

    async delete(id: number): Promise<void> {
        await this.connection.query(
            "delete from branas.column where id_column = $1",
            [id]
        );
    }
}