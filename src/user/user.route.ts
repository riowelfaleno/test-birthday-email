import express, { NextFunction, Router, Request, Response } from "express";
import { UserController } from "./user.controller";

const UserRouter: Router = express.Router();

// Controller initialization
const UserControllerObj = new UserController();

UserRouter.post("/", async (req: Request, res: Response) => {
  await UserControllerObj.createUser(req, res);
});

UserRouter.delete("/:email", async (req: Request, res: Response) => {
  await UserControllerObj.deleteUser(req, res);
});

UserRouter.put("/:email", async (req: Request, res: Response) => {
  await UserControllerObj.updateUser(req, res);
});

export { UserRouter };
