import emailjs from "@emailjs/browser";

const service_Id = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
const template_Id = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
const public_Key = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

export async function sendEmail(target) {
  try {
    const data = await emailjs.sendForm(
      service_Id,
      template_Id,
      target,
      public_Key
    );
    return data;
  } catch (error) {
    throw new Error("An unexpected error occurred. Please try again.");
  }
}
