
import { Application, Router, Context  } 
    from "https://deno.land/x/oak/mod.ts";

import { Status, STATUS_TEXT } 
    from "https://deno.land/std/http/http_status.ts";

import { expect } 
    from "https://deno.land/x/expect/mod.ts";

	
import {
    getNumericDate,
    create as jwtCreate,
    decode as jwtDecode,
    verify as jwtVerify
} from "https://deno.land/x/djwt/mod.ts";   

import type { Header as jwtHeader, 
    Payload as  jwtPayload } 
    from "https://deno.land/x/djwt/mod.ts";


import { config } 
    from "https://deno.land/x/dotenv/mod.ts";

import  sha512 
    from "./utils/sha512.ts";
    
import {
    Bson,
    MongoClient,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

import { Client as ClientMariaDB } from "https://deno.land/x/mysql/mod.ts";


export const { JWT_SECRET } = config({ safe: true });


export { Application, Router, Context, Status, 
    STATUS_TEXT, expect,
    getNumericDate, jwtCreate, jwtDecode, jwtVerify, 
    config
};

export type {jwtHeader, jwtPayload }; 

export default sha512 ;

export {    
    Bson,
    MongoClient,
}
export {    
    ClientMariaDB,
}


