import { BoardRepository } from "./domain/repository/BoardRepository";
import { CardRepository } from "./domain/repository/CardRepository";
import { ColumnRepository } from "./domain/repository/ColumnRepository";
import { AuthController } from "./infra/controller/AuthController";
import { BoardController } from "./infra/controller/BoardController";
import { PgPromiseConnection } from "./infra/database/PgPromiseConnection";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { BoardRepositoryDatabase } from "./infra/repository/BoardRepositoryDatabase";
import { CardRepositoryDatabase } from "./infra/repository/CardRepositoryDatabase";
import { ColumnRepositoryDatabase } from "./infra/repository/ColumnRepositoryDatabase";

const connection = new PgPromiseConnection();
const http = new ExpressAdapter();

const boardRepository: BoardRepository = new BoardRepositoryDatabase(connection);
const columnRepository: ColumnRepository = new ColumnRepositoryDatabase(connection);
const cardRepository: CardRepository = new CardRepositoryDatabase(connection);

new AuthController(http);
new BoardController(http, connection, boardRepository, columnRepository, cardRepository);

http.listen(3001);
