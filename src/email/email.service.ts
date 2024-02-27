import axios, { AxiosError } from "axios";
import { SendEmailParam } from "./email.interface";
import emailLogsModel from "./emailLogs.model";
import { SendEmailStatus } from "./email.type";

export class EmailService {
  public async sendEmail(param: SendEmailParam) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      email: param.email,
      message: param.message,
    };

    const emailBaseUrl = "https://email-service.digitalenvision.com.au";

    try {
      const response = await axios.post(
        `${emailBaseUrl}/send-email`,
        body,
        config
      );

      await emailLogsModel.create({
        email: param.email,
        status: SendEmailStatus.SUCCESS,
        errorMessage: "",
      });

      return response.data;
    } catch (error: any) {
      let errorMessage;

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
      } else {
        errorMessage = error.message;
      }

      await emailLogsModel.create({
        email: param.email,
        status: SendEmailStatus.FAILED,
        errorMessage,
      });

      throw new Error(errorMessage);
    }
  }
}