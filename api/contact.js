export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method Not Allowed"
    });
  }

  try {

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORM_KEY,

        name: req.body.name,
        phone: req.body.phone,
        service: req.body.service,
        message: req.body.message
      })
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {

    return res.status(500).json({
      message: "Something went wrong"
    });

  }
}