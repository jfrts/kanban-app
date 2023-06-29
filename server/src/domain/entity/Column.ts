export class Column {
    constructor(readonly idBoard: number | undefined, readonly id: number | undefined, readonly name: string, readonly hasEstimative: boolean) {
        if (name === "") throw new Error("O nome da coluna é obrigatório!");
    };
}