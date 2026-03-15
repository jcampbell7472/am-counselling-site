export async function onRequestPost(context) {

  const data = await context.request.formData();

  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  const emailBody = `
New enquiry from website

Name: ${name}
Email: ${email}

Message:
${message}
`;

  await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: "alicemagee33@gmail.com" }]
        }
      ],
      from: {
        email: "website@yourdomain.co.uk",
        name: "Website Enquiry"
      },
      subject: "New Counselling Enquiry",
      content: [
        {
          type: "text/plain",
          value: emailBody
        }
      ]
    })
  });

  return new Response("Email sent");
}