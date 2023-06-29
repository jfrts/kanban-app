import { Card } from "./Card";

export class Column {
    idColumn?: number;
    cards: Card[];

    constructor(readonly name: string, readonly hasEstimative: boolean) {
        this.cards = [];
    };

    addCard(card: Card) {
        this.cards.push(card);
    }

    deleteCard (idCard: number) {
        const card = this.cards.find(card => {
            return card.idCard === idCard;
        });
		if (!card) throw new Error("Card not found");
		this.cards.splice(this.cards.indexOf(card), 1);
	}

    getEstimative() {
        return this.cards.reduce((total, card) => total += card.estimative, 0);
    }
}