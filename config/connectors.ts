
import { MongoClient, ClientMariaDB } 
    from "../dependences.ts";


const mongoClient = new MongoClient();
const URI_MONGO="mongodb://itvoDeveloper:********@localhost:27017/quotes?authMechanism=SCRAM-SHA-256&authSource=admin";
export const connectorMongoDB = await mongoClient.connect(URI_MONGO);

const CONN_MARIADB = {
    hostname: "localhost",
    port: 3308,
    username: "devDeno",
    password: "**********",
    db: "quotes",
    poolSize: 10};

export const connectorMariaDB = await new ClientMariaDB().connect(CONN_MARIADB);

