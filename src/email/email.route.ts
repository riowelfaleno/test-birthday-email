import express, { NextFunction, Router, Request, Response } from "express";
import { EmailController } from "./email.controller";

const EmailRouter: Router = express.Router();

// Controller initialization
const EmailControllerObj = new EmailController();

EmailRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    await EmailControllerObj.sendEmail(req, res);
  }
);

export { EmailRouter };
