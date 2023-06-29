import { Card } from "../../src/domain/entity/Card";

test("Deve criar um cartão", function () {
	const card = new Card(undefined, undefined, "Atividade 1", 3);
	expect(card.title).toBe("Atividade 1");
	expect(card.estimative).toBe(3);
});

test("Não deve criar cartão sem título", function () {
	expect(() => new Card(undefined, undefined, "", 3)).toThrow(new Error("O título do cartão é obrigatório!"));
});

test("Não deve criar cartão com estimativa negativa", function () {
	expect(() => new Card(undefined, undefined, "Atividade 1", -3)).toThrow(new Error("A estimativa do cartão deve ser um número positivo."));
});