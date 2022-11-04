 
import { Application } from "./dependences.ts";

import routerQuotes from "./routes/quotes.ts";
import routerUsers from "./routes/users.ts";


import NotFound from "./middleware/notfound.ts";
import errorHandler from "./middleware/errorhandler.ts";


const env = Deno.env.toObject()
const PORT = env.PORT || 8080;
const HOST = env.HOST || '0.0.0.0';

const app = new Application();

app.use(errorHandler);


//--- Quotes
app.use(routerQuotes.routes());
app.use(routerQuotes.allowedMethods());
//--- Users
app.use(routerUsers.routes());
app.use(routerUsers.allowedMethods());

app.use(NotFound);

//--- sha256("acardosojmz", "utf8", "hex");

//--- `(alt + }) 
console.log(`Server running on port ${PORT}`  );
app.listen(`${HOST}:${PORT}`);



