export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed'
    });
  }

  try {

    const { name, phone, service, message } = req.body;

    const payload = {

      access_key: process.env.WEB3FORM_KEY,

      subject: "New Fabrication Inquiry",

      name,
      phone,
      service,
      message

    };

    const response = await fetch('https://api.web3forms.com/submit', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },

      body: JSON.stringify(payload)

    });

    const result = await response.json();

    console.log(result);

    if (result.success) {

      return res.status(200).json({
        success: true
      });

    } else {

      return res.status(400).json({
        success: false,
        message: result.message
      });

    }

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,
      message: 'Server Error'

    });

  }

}