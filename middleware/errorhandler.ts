import { Context, Status } from "../dependences.ts";

const errorHandler = async (ctx: Context, next: any) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { 
        success: false,
        message: err.message, 
        data: [], 
    };
  }
};

export default errorHandler;
