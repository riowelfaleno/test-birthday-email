import { Request, Response } from "express";
import { EmailService } from "./email.service";
import { AxiosError } from "axios";

export class EmailController {
  private emailService;
  constructor() {
    this.emailService = new EmailService();

    this.sendEmail = this.sendEmail.bind(this);
  }

  public async sendEmail(req: Request, res: Response) {
    const { email, message } = req.body;

    try {
      if (!email || !message) {
        throw new Error("Email or message must not empty");
      }

      const sendEmailResponse = await this.emailService.sendEmail({
        email,
        message,
      });

      return res.send(sendEmailResponse);
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
