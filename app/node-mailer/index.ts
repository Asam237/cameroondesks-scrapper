import * as nodemailer from "nodemailer";
import * as path from "path";
import readline from "readline";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "abbasaliaboubakar@gmail.com",
    pass: "welfexgsiyhlqwqi",
  },
});

const inquirer = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sendEmail = (address: string) => {
  transporter.sendMail(
    {
      from: "abbasaliaboubakar@gmail.com",
      to: address,
      subject: "All available job opportunities in Cameroon.",
      text: "Receive your job opportunities notification in Cameroon. Feel free to share this email with anyone who might find it interesting.",
      attachments: [
        {
          filename: "vacancies.xlsx",
          path: path.join(__dirname, "..", "datas", "vacancies.xlsx"),
        },
      ],
    },
    (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log(
          `\x1b[32m✅ You have forwarded the list of email addresses to the provided address.\nEmail sent:`,
          info.response + `\nThank you!\n`
        );
      }
      process.exit();
    }
  );
};

inquirer.question("Please enter your email address: ", async (address) => {
  sendEmail(address);
});
