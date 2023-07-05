import { mount } from "@vue/test-utils";
import { Board } from "../src/entities/Board";
import { BoardService, ColumnInput } from "../src/services/BoardService";
import BoardViewVue from "../src/views/BoardView.vue";

function sleep (ms: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, ms);
	})
}

test.skip("Deve testar o board view", async function () {
	// @ts-ignore
	const boardService: BoardService = {
		// @ts-ignore
		async getBoard(idBoard: number) {
			const board = new Board(1, "Projeto 1");
			board.addColumn("Todo", true);
			board.addColumn("Doing", true);
			board.addColumn("Done", false);
			board.addCard("Todo", "Atividade 1", 3);
			board.addCard("Todo", "Atividade 2", 2);
			board.addCard("Todo", "Atividade 3", 1);
			return board;
		},
		// @ts-ignore
		async saveColumn (column: ColumnInput): Promise<number> {
			return 1;
		}
	}
	// const boardService = new BoardServiceHttp();
	const wrapper = mount(BoardViewVue, {
		global: {
			provide: {
				boardService
			}
		}
	});
	await sleep(100);
	expect(wrapper.get("#estimative").text()).toBe("6");
});