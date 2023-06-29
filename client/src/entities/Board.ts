import { DomainEvent } from "../events/DomainEvent";
import { BaseEntity } from "./BaseEntity";
import { Card } from "./Card";
import { Column } from "./Column";

export class Board extends BaseEntity {
    selectedColumn?: Column;
    selectedCard?: Card;
    columns: Column[];

    constructor(readonly id: number, readonly name: string) {
        super();
        this.columns = [];
    }

    addColumn(name: string, hasEstimative: boolean) {
        if (name !== "") {
            const column = new Column(name, hasEstimative);
            this.columns.push(column);
        }
        this.publish(new DomainEvent("addColumn", { idBoard: this.id, name, hasEstimative }));
    }

    deleteColumn(idColumn: number) {
        const column = this.columns.find(column => column.idColumn === idColumn);
        if (!column) throw new Error("Column not found");
        this.columns.splice(this.columns.indexOf(column), 1);
        this.publish(new DomainEvent("deleteColumn", { idBoard: this.id, idColumn: column.idColumn }));
    }

    addCard(columnName: string, cardTitle: string, cardEstimative: number) {
        const column = this.columns.find(column => {
            return column.name === columnName;
        });
        if (!column) throw new Error("Column not found");
        const card = new Card(cardTitle, cardEstimative);
        column.addCard(card);
        this.publish(new DomainEvent("addCard", { idBoard: this.id, idColumn: column.idColumn, title: cardTitle, estimative: cardEstimative, card }));
    }

    deleteCard(column: Column, idCard: number) {
        column.deleteCard(idCard);
        const event = new DomainEvent("deleteCard", { idBoard: this.id, idColumn: column.idColumn, idCard });
        this.publish(event);
    }

    selectCard(column: Column, card: Card) {
        this.selectedColumn = column;
        this.selectedCard = card;
    }

    resetCard() {
        this.selectedColumn = undefined;
        this.selectedCard = undefined;
    }

    moveCardTo(column: Column) {
        if (!this.selectedColumn || !this.selectedCard || !this.selectedCard.idCard) return;
        if (this.selectedColumn === column) return;
        this.selectedColumn.deleteCard(this.selectedCard.idCard);
        column.addCard(this.selectedCard);
        this.selectedColumn = column;
        this.publish(new DomainEvent("updatePositionMap", { idBoard: this.id, positionMap: this.generatePositionMap() }));
    }

    swap(card: Card) {
        if (this.selectedCard === card) return;
        if (!this.selectedColumn || !this.selectedCard || !this.selectedCard.idCard) return;
        const origin = this.selectedColumn.cards.indexOf(this.selectedCard);
        const destiny = this.selectedColumn.cards.indexOf(card);
        [this.selectedColumn.cards[origin], this.selectedColumn.cards[destiny]] = [this.selectedColumn.cards[destiny], this.selectedColumn.cards[origin]]
        this.publish(new DomainEvent("updatePositionMap", { idBoard: this.id, positionMap: this.generatePositionMap() }));
    }

    generatePositionMap() {
        const positionMap: any = {};
        for (const column of this.columns) {
            if (!column.idColumn) continue;
            positionMap[column.idColumn] = [];
            for (const card of column.cards) {
                positionMap[column.idColumn].push(card.idCard);
            }
        }
        return positionMap;
    }

    getEstimative(): number {
        const boardEstimativeTotalSum = this.columns.reduce(function (boardTotal: number, column: Column) {
            const columnTotalEstimativeSum = boardTotal += column.getEstimative();
            return columnTotalEstimativeSum;
        }, 0);
        return boardEstimativeTotalSum;
    }

    increaseEstimative(card: Card) {
        card.estimative++;
    }

    decreaseEstimative(card: Card) {
        if (card.estimative > 0) {
            card.estimative--
        }
    }
}