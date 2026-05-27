export default async function handler(req, res) {

  if (req.method !== 'POST') {

    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed'
    });

  }

  try {

    const { name, phone, service, message } = req.body;

    const response = await fetch('https://api.web3forms.com/submit', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },

      body: JSON.stringify({

        access_key: process.env.WEB3FORM_KEY,

        subject: 'New Raja Steel Inquiry',

        from_name: 'Raja Steel Website',

        name,
        phone,
        service,
        message

      })

    });

    const text = await response.text();

    console.log(text);

    const data = JSON.parse(text);

    return res.status(200).json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,
      message: error.message

    });

  }

}