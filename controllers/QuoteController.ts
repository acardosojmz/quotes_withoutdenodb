
import quoteService  from "../services/QuoteService.ts";

import { Status } from "../dependences.ts";

/**
 * @desc  Returns all list quotes
 * @route   GET /api/v1/quotes
 * @returns list quotes
 */

export const getQuotes = async ( 
    {request, response}: { request: any, response: any },
    ) => {


    const pageParameter =  parseInt(request.url.searchParams.get("page")) || 1;
    const sizeParameter =  parseInt(request.url.searchParams.get("size")) || 50;

    const page = pageParameter<1?1:pageParameter; 
    const size = sizeParameter<5?5:sizeParameter; 

    const quotes= await quoteService.getQuotes(page, size);

    response.status = Status.OK;
    response.body = {
        success: true,
        message: "Retrive list quotes",
        data: quotes,
    };
};

/**
 * @desc  get single quote by id
 * @route GET /api/v1/quote/:id
 * @param id - The parameter url
 * @returns quote
 */

export const getQuote = async (
    {params, response}: { params: { id: string }; response: any },
) => {

    const quote = await quoteService.getQuote(
        Number(params.id),
    );

    //console.log(quote.toString);
    
    if (quote.length) {
        response.status = Status.OK;
        response.body = {
            success: true,
            message: "quote",
            data: quote,
        };
        return;
    }
    response.status = Status.BadRequest;
    response.body = {
        success: false,
        message: `Quote with id: ${params.id} not found`,
        data: [],
    }
};

/**
 * @desc  add quote
 * @route   POST /api/v1/quotes
 * @param {"quote":"value","author":"value"}
 * @returns data new quote
 */

export const addQuote = async (
    {request, response}: { request: any; response: any },
) => {

    if (request.body()){
        const data = await request.body().value;
        if (data.quote && data.author){
            const quote = await quoteService.createQuote( data );

            response.status = Status.Created;
            response.body = {
                success: true,
                message: "save quote successfull", 
                data: [quote],
            };
            return;
        }
    }

    response.status = Status.BadRequest;
    response.body = {
        success: false,
        message: "The request must have the citation and author.",
        data: [],
    };
};

/**
 * @desc  update quote
 * @route   PUT /api/v1/quotes/:id
 * @param id - The parameter url
 * @param request.body {"quote":"value", "author":"value"} OR {"quote":"value"}  OR "author":"value" 
 * @returns quote updated or message quote not found
 */

export const updateQuote = async (
    {params, request, response}: {
        params: { id: string };
        request: any;
        response: any;
    },
) => {
    const currentQuote = await quoteService.getQuote(
        Number(params.id),
    );

    if (currentQuote.length){
        const data = await request.body().value;

        if (data.quote || data.author) {
            const updatedQuote = await quoteService.updateQuote(
                Number(params.id),
                {"id":Number(params.id,), 
                "quote":data.quote,
                "author":data.author },
            );
            if (updatedQuote) {
                response.status = Status.OK;
                response.body = {
                    success: true,
                    message: `Update for quote with id ${params.id} was successful`,
                    data: updatedQuote, 
                };
                return;
            }

            response.status = Status.InternalServerError;
            response.body = {
                success: false,
                message: `Update for quote with id ${params.id} failed`,
                data: [], 
            };
            return; 
        }
        response.status = Status.BadRequest;
        response.body = {
            success: false,
            message: "The request must have the citation or author.",
            data: [], 
        };
        return;
    }
    response.status = Status.NotFound;
    response.body = {
        success: false,
        message: `Quote with id: ${params.id} not found`,
        data: [], 
    };
};

/**
 * @desc  delete quote
 * @route   DELETE /api/v1/quotes/:id
 * @param id - The parameter url
 * @returns confirm quote deleted OR message  quote not found
 */

export const deleteQuote = async (
    {params, response}: { params: { id: string }; response: any },
) => {
    const quote = await quoteService.deleteQuote(
        Number(params.id),
    );

    let message = !quote.length?"Quote not found":"Quote removed";
    
    response.body = {
        success: quote.length !== 0,
        message: message,
        data: quote,
    };
    
};
