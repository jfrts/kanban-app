export class Board {
    
    constructor(readonly id: number | undefined, readonly name: string) {
        if (name === "") throw new Error("O nome do quadro é obrigatório!");
    };
}