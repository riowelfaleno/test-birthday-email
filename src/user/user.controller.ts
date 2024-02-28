import { AxiosError } from "axios";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import validator from "validator";

export class UserController {
  private userService;
  constructor() {
    this.userService = new UserService();

    this.createUser = this.createUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  public async createUser(req: Request, res: Response) {
    const { firstName, lastName, email, dob, timezone } = req.body;

    try {
      if (!firstName || !lastName || !email || !dob || !timezone) {
        throw new Error("Missing parameters");
      }

      if (!validator.isEmail(email)) {
        throw new Error("Invalid email");
      }

      const createUser = await this.userService.createUser({
        firstName,
        lastName,
        email,
        dob,
        timezone,
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
    const { firstName, lastName, dob, timezone } = req.body;
    const { email } = req.params;

    try {
      const updateUser = await this.userService.updateUser({
        firstName,
        lastName,
        email,
        dob,
        timezone,
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
