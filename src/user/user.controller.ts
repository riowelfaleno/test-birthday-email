import { AxiosError } from "axios";
import { Request, Response } from "express";
import userModel from "./user.model";
import { UserService } from "./user.service";

export class UserController {
  private userService;
  constructor() {
    this.userService = new UserService();

    this.createUser = this.createUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  public async createUser(req: Request, res: Response) {
    const { firstName, lastName, email, dob } = req.body;

    try {
      if (!firstName || !lastName || !email || !dob) {
        throw new Error("Missing parameters");
      }

      const createUser = await this.userService.createUser({
        firstName,
        lastName,
        email,
        dob,
      });

      return res.send(createUser);
    } catch (error: any) {
      let errorMessage;
      let status = 500;

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
        status = error.response?.status ?? 500;
      } else {
        errorMessage = error.message;
      }

      console.error(errorMessage);
      return res.status(status).send(errorMessage);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { email } = req.params;

    try {
      if (!email) {
        throw new Error("Email is missing");
      }

      await this.userService.deleteUser({ email });

      console.log("done");

      return res.sendStatus(200);
    } catch (error: any) {
      let errorMessage;
      let status = 500;

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
        status = error.response?.status ?? 500;
      } else {
        errorMessage = error.message;
      }

      console.error(errorMessage);
      return res.status(status).send(errorMessage);
    }
  }

  public async updateUser(req: Request, res: Response) {
    const { firstName, lastName, dob } = req.body;
    const { email } = req.params;

    try {
      const updateUser = await this.userService.updateUser({
        firstName,
        lastName,
        email,
        dob,
      });

      return res.send(updateUser);
    } catch (error: any) {
      let errorMessage;
      let status = 500;

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
        status = error.response?.status ?? 500;
      } else {
        errorMessage = error.message;
      }

      console.error(errorMessage);
      return res.status(status).send(errorMessage);
    }
  }
}
