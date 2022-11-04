import { default as quoteRepository } 
    from "../repositories/QuoteRepository.ts";
import { Quote } from "../interfaces/Quote.ts";

class QuoteService {

    getQuotes  =  async(page: number, size: number) => {
        return await quoteRepository.getQuotes(page, size);
    };

      
    getQuoteByoid = async (oid: string) =>{
       return await quoteRepository.getQuoteByoid(oid);
    }
    
    getQuote = async (id: number) => {
        return await quoteRepository.getQuote(id);
    }
    
    createQuote = async (quote: Quote) => {
        return await quoteRepository.addQuote(quote);
            
    };

    updateQuote = async (id: number, quote: Quote, ) => {
        return  await quoteRepository.updateQuote(id,quote);
    };

    deleteQuote = async (id: number) => {
        return await quoteRepository.deleteQuote(id);
    };
}

export default new QuoteService();