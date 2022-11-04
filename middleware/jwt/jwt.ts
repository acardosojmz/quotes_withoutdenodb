import { 
    getNumericDate 
} from "../../dependences.ts";

import type {
    jwtPayload, 
    jwtHeader
} from "../../dependences.ts"; 

const header:jwtHeader = { alg: 'HS512', typ: 'JWT' }

const  payload = (name:string) => {

    const payloader:jwtPayload = {
        //--- Identifica el objeto o usuario en nombre del cual fue emitido el JWT
        sub: 'cardoso.developer',
        //--- Identifica la audiencia o receptores para lo que el JWT fue emitido, normalmente el/los servidor/es de recursos (e.g. la API protegida)
        aud: 'api-quotes',
        //--- expiración del token (24 hour from now) 
        exp: getNumericDate(60 * 60 * 24),
        //--- Identifica la marca temporal en qué el JWT fue emitido 
        iat: getNumericDate(new Date()),
        //--- a partir de cuando es válido
        nbf: getNumericDate(new Date()),
        //--- Identificador único del token incluso entre diferente proveedores de servicio
        jit: '1694503654949484338',
        //--- user
        name: name,

    };
    return payloader
};

const key=  await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );
  

export { header, payload, key}