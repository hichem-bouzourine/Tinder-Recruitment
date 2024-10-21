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

const sendCalendarScheduleMail = async (req, res) => {
    try {
        const { email, scheduleData } = req.body;

        // Read the confirmSchedule.html template
        const templatePath = path.join(__dirname, 'confirmSchedule.html');
        let emailTemplate = fs.readFileSync(templatePath, 'utf8');

        // Generate the schedule table rows
        let scheduleRows = '';
        scheduleData.forEach(day => {
            day.appointments.forEach(appointment => {
                scheduleRows += `
                    <tr>
                        <td>${day.name}</td>
                        <td>${appointment.title}</td>
                        <td>${appointment.time}</td>
                    </tr>
                `;
            });
        });

        // Inject the schedule rows into the template
        emailTemplate = emailTemplate.replace('<!-- Schedule details will be inserted dynamically -->', scheduleRows);

        // Configure nodemailer with your SMTP credentials
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


        // Send email
        await transporter.sendMail({
            from: 'your-email@gmail.com', // Sender address
            to: email,                    // Recipient's email address
            subject: 'Weekly Calendar Schedule',  // Email subject
            html: emailTemplate            // HTML body
        });

        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendMail, sendCalendarScheduleMail };