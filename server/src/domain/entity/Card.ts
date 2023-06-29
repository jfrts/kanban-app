export class Card {
    constructor(readonly idColumn: number | undefined, readonly id: number | undefined, readonly title: string, readonly estimative: number) {
        if (title === "") throw new Error("O título do cartão é obrigatório!");
        if (estimative < 0) throw new Error("A estimativa do cartão deve ser um número positivo.")   
    };
}