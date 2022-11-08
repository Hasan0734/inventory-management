// with mailgun

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  ky: process.env.MAILGUN_API_KEY,
});

module.exports.sendMailWithMailGun = async (data) => {
  const result = await ms.messages.create(
    "sanbof3104014604b45b09c95dd762669be2b.mailgun.org",
    {
      from: "FORM_EMAIL",
      to: data.to,
      subject: data.subject,
      text: data.text,
    }
  );
  return result.id;
};
