import {Request,Response, NextFunction } from "express";
import cyber from "../2-utills/cyber";
import { UnauthorizedErrorModel } from "../4-models/error-models";

 async function verifyAdmin  (request: Request, response: Response, next: NextFunction)  {

    try {
  
      const isValid = await cyber.verifyAdmin(request);
      if (!isValid) throw new UnauthorizedErrorModel('You are not authorized');
      next();
  
    } catch (err: any) {
      next(err);
    }
  
  }
  
  export default verifyAdmin;