import { User } from "../interfaces/User.ts";
import { default as userRepository  } 
    from "../repositories/UserRepository.ts";

import  sha512 from "../dependences.ts";


class UserService {

    isLoginUser = async (account: string, password: string)=>{
        password = await sha512(password);   
        return await userRepository.isLogin(account, password);
        
    }
    
    fetchUsers = async () =>  {
        return  await userRepository.getUsers();
    };

      
    fetchUser = async (id: number) =>{
        return await userRepository.getUser(id);
    }
        
    
    
    createUser = async (user: User) => {
        return await userRepository.addUser(user)  
    };

    updateUser = async (id: number, user:User) => {  
        user.password = await sha512(user.password); 
        return await userRepository.updateUser(id,user);
    };

    deleteUser = async (id: number) => {
        return  await userRepository.deleteUser(id);
    };
}

export default new UserService();