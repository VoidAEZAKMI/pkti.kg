const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Настройки почтового транспорта (используйте свои данные SMTP-сервера)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: email,
        to: 'adilet.t.k@gmail.com',
        subject: subject,
        text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Ошибка при отправке' });
        }
        res.status(200).json({ success: true, message: 'Письмо отправлено' });
    });
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
