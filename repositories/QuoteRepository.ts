import { Quote } from "../interfaces/Quote.ts";
import { QuoteModel } from "../models/QuoteModel.ts";

class QuoteRepository { 

    async getQuotes(page: number, size: number)  { 

        const cursor = QuoteModel.find();
        //--- paginate
        cursor.skip((page-1) * size)
                       .limit(page*size);

        return  await cursor.toArray(); 
    } 
   
    async getQuoteByoid(oid: string) { 
        return await QuoteModel.findOne({"_id":oid}); 
    } 
    
    async getQuote(quoteId: number) { 
        return  await QuoteModel.find({id: quoteId} ).toArray();
    } 

    async addQuote(quote: Quote) { 
        await QuoteModel.insertOne(quote);
        return quote;
    }

    

    async updateQuote(id: number, quote: Quote) { 
        await QuoteModel.updateOne(
            { "id": id},
                { $set: {
                    id: quote.id, 
                    quote: quote.quote,
                    author: quote.author
                } 
            },
          );
        let quoteUpdated= await  this.getQuote(id);
        return quoteUpdated;
    }

    async deleteQuote(id: number) {    
        let quote= await this.getQuote(id) ;
        await QuoteModel.deleteOne({ "id": id });
        return quote;
    }

} 

export default new QuoteRepository();
