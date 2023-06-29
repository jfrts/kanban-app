import { mount } from "@vue/test-utils";
import ColumnComponentVue from "../src/components/ColumnComponent.vue";
import { Board } from "../src/entities/Board";

test("Deve testar a Column View", async function () {
    const board = new Board(1, "Projeto 1");
    expect(board.name).toBe("Projeto 1");
    board.addColumn("Todo", true);
    board.addColumn("Doing", true);
    board.addColumn("Done", false);
    board.addCard("Todo", "Atividade 1", 3);
    board.addCard("Todo", "Atividade 2", 2);
    board.addCard("Todo", "Atividade 3", 1);
    board.addCard("Todo", "Atividade 4", 2);
    const [column] = board.columns;
    const [card] = column.cards;
    const wrapper = mount(ColumnComponentVue, {
        props: { board, column, card }
    });
    expect(wrapper.get("#card-estimative").text()).toBe("3");
    await wrapper.get("#decrease-estimative").trigger("click");
    expect(wrapper.get("#card-estimative").text()).toBe("2");
    await wrapper.get("#increase-estimative").trigger("click");
    expect(wrapper.get("#card-estimative").text()).toBe("3");
    await wrapper.get("#decrease-estimative").trigger("click");
    await wrapper.get("#decrease-estimative").trigger("click");
    await wrapper.get("#decrease-estimative").trigger("click");
    expect(wrapper.get("#card-estimative").text()).toBe("0");
    await wrapper.get("#decrease-estimative").trigger("click");
    expect(wrapper.get("#card-estimative").text()).toBe("0");
});