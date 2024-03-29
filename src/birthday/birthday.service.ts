import moment from "moment-timezone";
import { EmailService } from "../email/email.service";
import userModel from "../user/user.model";
import emailLogsModel from "../email/emailLogs.model";
import { SendEmailStatus } from "../email/email.type";

const emailServiceObj = new EmailService();

export class BirthdayService {
  public async sendBirthdayMessage() {
    /** Query users which birthday is today */
    const users = await userModel.aggregate([
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          timezone: 1,
          date: {
            $dayOfMonth: "$dob",
          },
          month: {
            $month: "$dob",
          },
        },
      },
      {
        $match: {
          date: new Date().getUTCDate(),
          month: new Date().getUTCMonth() + 1,
        },
      },
    ]);

    for (const user of users) {
      const userLocalTime = moment.utc().tz(user.timezone);

      /** Send birthday email at 9AM in the local time */
      if (userLocalTime.hour() === 9 && userLocalTime.minute() === 0) {
        console.log(
          `Sending birthday message to ${
            user.firstName
          } at ${userLocalTime.format()}`
        );

        emailServiceObj.sendEmail({
          email: user.email,
          message: `Hey ${user.firstName} ${user.lastName}, it’s your birthday`,
        });
      }
    }

    return;
  }

  public async sendFailedMessages() {
    /** Get failed email from the logs */
    const getFailedEmail = await emailLogsModel.find({
      status: SendEmailStatus.FAILED,
      isResolved: false,
    });

    if (getFailedEmail.length > 0) {
      for (const failedEmail of getFailedEmail) {
        const user = await userModel.findOne({
          email: failedEmail.email,
        });
        if (!user) {
          continue;
        }

        /** If user birthday is today, send the email */
        if (
          new Date(user.dob).getMonth() === new Date().getMonth() &&
          new Date(user.dob).getDate() === new Date().getDate()
        ) {
          emailServiceObj.sendEmail({
            email: user.email,
            message: `Hey ${user.firstName} ${user.lastName}, it’s your birthday`,
          });

          /** Update isResolved to true */
          await emailLogsModel.findOneAndUpdate(
            { id: failedEmail._id },
            { isResolved: true }
          );
        }
      }
    }

    return;
  }
}
