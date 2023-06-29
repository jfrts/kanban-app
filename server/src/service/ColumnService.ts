import { Column } from "../domain/entity/Column";
import { ColumnRepository } from "../domain/repository/ColumnRepository";

export class ColumnService {
    constructor(readonly repository: ColumnRepository) { };

    async getColumns(idBoard: number): Promise<Column[]> {
        return this.repository.findAllByBoardId(idBoard);
    }

    async get(idColumn: number): Promise<Column> {
        return this.repository.get(idColumn);
    }

    async save(input: SaveInput): Promise<number> {
        const idColumn = await this.repository.save(new Column(input.idBoard, 4, input.name, input.hasEstimative));
        return idColumn;
    }

    async delete(idColumn: number): Promise<void> {
        await this.repository.delete(idColumn);
    }
}

type SaveInput = {
    idBoard: number,
    name: string,
    hasEstimative: boolean
}