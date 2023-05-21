import { NextFunction, Request, Response } from "express";
import cyber from "../2-utills/cyber";
import { UnauthorizedErrorModel } from "../4-models/error-models";

async function blockNonLoggedIn(request: Request, response: Response, next: NextFunction) {
    try {
        const isValid = await cyber.verifyToken(request);
        if(!isValid) throw new UnauthorizedErrorModel("You are not logged in");
        next();
    }
    catch(err: any) {
        next(err);
    }
    
}

export default blockNonLoggedIn;