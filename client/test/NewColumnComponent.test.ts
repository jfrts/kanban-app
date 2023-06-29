import { mount } from "@vue/test-utils";
import NewColumnComponentVue from "../src/components/NewColumnComponent.vue";
import { Board } from "../src/entities/Board";
import { DomainEvent } from "../src/events/DomainEvent";

test("Deve testar a New Column View", async function () {
    const board = new Board(1, "Projeto 1");
    expect(board.name).toBe("Projeto 1");
    board.addColumn("Todo", true);
    board.addColumn("Doing", true);
    board.addColumn("Done", false);
    const events: DomainEvent[] = [];
    board.on("addColumn", function (event: DomainEvent) {
        events.push(event);
    })
    const wrapper = mount(NewColumnComponentVue, {
        props: {
            board,
        }
    });
    await wrapper.get("#input_new_column").setValue("New Column");
    await wrapper.get("#add_new_column").trigger("click");
    expect(board.columns[board.columns.length - 1].name).toBe("New Column");
    const [event] = events;
    expect(event.name).toBe("addColumn");
    expect(event.data.name).toBe("New Column");
});