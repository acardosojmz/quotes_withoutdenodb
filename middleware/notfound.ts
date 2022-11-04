import { Context, Status } from "../dependences.ts";


const NotFound = async (ctx: Context) => {
  ctx.response.status = Status.NotFound;
  ctx.response.body = { 
      success: false,
      message: "Resource not found !!", 
      data: []
    };
};

export default NotFound;
