const nodemailer = require('nodemailer');
require('dotenv').config({ path: 'email.env' });
const fs = require('fs');
const path = require('path');

const sendMail = async (req, res) => {
    const { to, subject, isAccepted, comment, etudiantName, offreNom } = req.body;

    // Configure Nodemailer
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'hichembouzourine.uni@gmail.com',
            pass: process.env.EMAILPASSWORD
        }
    });

    // Determine which template to use
    const templatePath = isAccepted
        ? path.join(__dirname, 'acceptedEmailTemplate.html')
        : path.join(__dirname, 'rejectedEmailTemplate.html');

    // Read the HTML template from the file
    fs.readFile(templatePath, 'utf-8', (err, htmlTemplate) => {
        if (err) {
            console.error('Error reading email template file:', err);
            return;
        }

        // Create the comment HTML block if there's a comment, otherwise use an empty string
        const commentHtml = comment
            ? `<p><strong>Commentaire supplémentaire :</strong> ${comment}</p>`
            : '';

        // Replace placeholders with actual values
        let emailContent = htmlTemplate
            .replace('${etudiantName}', etudiantName)
            .replace('${offreNom}', offreNom)
            .replace('{{comment}}', commentHtml || ''); // Comment is optional

        // Email options
        const mailOptions = {
            from: 'hichembouzourine.uni@gmail.com',
            to,
            subject: subject,
            html: emailContent // Use the processed HTML template
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error sending email:', error);
            }
            console.log('Email sent: ' + info.response);
        });
    });
};

module.exports = { sendMail };