import { Board } from "../../src/domain/entity/Board";

test("Deve criar um quadro", function () {
	const board = new Board(undefined, "Projeto 1");
	expect(board.name).toBe("Projeto 1");
});

test("Não deve criar um quadro sem nome", function () {
	expect(() => new Board(undefined, "")).toThrow(new Error("O nome do quadro é obrigatório!"));
});