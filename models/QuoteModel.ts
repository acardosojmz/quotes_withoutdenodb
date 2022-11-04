import { connectorMongoDB } 
    from "../config/connectors.ts";  

import { Quote } 
from "../interfaces/Quote.ts";    


export const QuoteModel = connectorMongoDB.collection<Quote>("quote");
