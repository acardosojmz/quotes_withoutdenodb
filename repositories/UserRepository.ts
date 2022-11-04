import { User } from "../interfaces/User.ts";
import  UserModel  from "../models/UserModel.ts";


class UserRepository { 

    async getUsers() { 
        return await  UserModel.getAll();
    }
    
    async getUser(id:number) { 
        return await UserModel.getById(id);
    } 

    async isLogin(account:string, password:string) { 
        return  await UserModel.isLogin(account, password);
    } 

    async addUser(user: User) { 
        return await UserModel.add(user.account, user.password);
    }

    

    async updateUser(id: number, user: User) { 
        const updatedUser = await  UserModel.updateById(id, user.account, user.password);
        return await this.getUser(id); 
    }

    async deleteUser(id: number) {
        let userDeleted = await this.getUser(id); 
        await UserModel.deleteById(id);
        return userDeleted;
    }

} 

export default new UserRepository();
