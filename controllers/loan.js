const nodemailer = require('nodemailer');

// Route POST pour recevoir les données du formulaire
exports.contactAdmin = (req, res) => {
  const { name, email, subject, message } = req.body;

  // Configuration du transporteur SMTP pour Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Adresse e-mail prédéfinie pour envoyer les e-mails
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Options de l'e-mail à envoyer
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'testbackend2024@gmail.com', // Adresse e-mail de l'administrateur
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
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

// Logique métier pour traiter les demandes de loan et envoyer dans le mail du admin
exports.loanRequest = (req, res) => {
  const { object, amount, period, rate, name, email } = req.body;

  // Configuration du transporteur SMTP pour Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Adresse e-mail prédéfinie pour envoyer les e-mails
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Options de l'e-mail à envoyer
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'testbackend2024@gmail.com', // Adresse e-mail de l'administrateur
    subject: 'New Loan Request',
    text: `Loan Request Details\n\n\n Name: ${name}\nEmail: ${email}\nSubject: ${object}\nAmount: ${amount} €\nPeriod: ${period} months\n`,
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
