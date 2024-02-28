import express from "express";
import { EmailRouter } from "./src/email/email.route";
import { UserRouter } from "./src/user/user.route";
import bodyParser from "body-parser";
import "./src/db/dbMongo.module";
import cron from "node-cron";
import { BirthdayService } from "./src/birthday/birthday.service";

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json({ type: "application/json" }));

app.use("/email", EmailRouter);
app.use("/user", UserRouter);

/** Cronjob to send birthday greetings */
cron.schedule(
  "*/30 * * * *",
  async () => {
    try {
      const birthdayService = new BirthdayService();

      birthdayService.sendBirthdayMessage();
      birthdayService.sendFailedMessages();

      console.log("Cronjob done");
    } catch (error) {
      console.error("Failed to send birthday greetings:", error);
    }
  },
  {
    timezone: "UTC",
  }
);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
