import userService  from "../services/UserService.ts";
     
import { 
    Status, 
    jwtCreate 
} from "../dependences.ts";

import { 
    header, 
    payload,
    key
} from "../middleware/jwt/jwt.ts";


// @desc    Fetch all users
// @route   GET /api/v1/users
export const getUsers = async ({response}: { response: any }) => {
    const users= await userService.fetchUsers();
    response.body =  {
        success: true, 
        message: "list users", 
        data: users,
    };
};

// @desc    update user
// @route   GET /api/v1/users/:id
export const updateUser = async (
    {params, request, response}: {
        params: { id: string };
        request: any;
        response: any;
    }, ) => {

    const data = await request.body().value;
    if (data.account || data.password) {
        const updatedUser = await userService.updateUser(
            Number(params.id),
            {"id":Number(params.id,), 
            "account":data.account,
            "password":data.password },
        );
        if (updatedUser) {
            response.status = Status.OK;
            response.body = {
                success: true,
                message: `Update for user with id ${params.id} was successful`,
                data: updatedUser, 
            };
            return;
        }

        response.status = Status.InternalServerError;
        response.body = {
            success: false,
            message: `Update for user with id ${params.id} failed`,
            data: [], 
        };
        return; 
    }
    response.status = Status.BadRequest;
    response.body = {
        success: false,
        message: "The request must have the account or password.",
        data: [], 
    };
    return;
};
   




// @desc    Authenticate user
// @route   POST /api/v1/users/login
export const loginUser = async (
    {request, response}: { request: any; response: any },
) => {

    if (request.body()){
        
        const data = await request.body().value;
        
        const isLoginUser = await userService.isLoginUser(
            data.account, data.password);
        
        if (isLoginUser){
            response.status = Status.OK;
            const jwt = await jwtCreate(header, payload(data.account), key);
    
    
            response.body = {
                success: true,
                message: "Authenticate successfull", 
                data: jwt,
            }
            return;
        } 
        response.status = Status.UnprocessableEntity;
        response.body = {
            success: false,
            message:"Invalid username or password!",
            data: "", 
        };
        return;
    }

    response.status = Status.BadRequest;
    response.body = {
        success: false,
        message: "The request must have a body",
        data: "", 
    };
};

