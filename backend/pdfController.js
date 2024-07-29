import pdf from 'html-pdf';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import pdfTemplate from './documents/document.js';
import { fileURLToPath } from 'url';
import env from 'dotenv';
env.config();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPdf = (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if (err) {
            return res.status(500).send(err); // Use return to prevent multiple responses
        }
        res.send("PDF generated successfully");
    });
};

export const fetchPdf = (req, res) => {
    const filePath = path.join(__dirname, 'invoice.pdf');
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("File not found:", err);
            return res.status(404).send("PDF file not found"); // Use return to prevent multiple responses
        }
        res.sendFile(filePath);
    });
};

export const sendPdf = (req, res) => {
     const pathToAttachment = path.join(__dirname, 'invoice.pdf');
    const attachment = fs.readFileSync(pathToAttachment).toString("base64");
    
    let smtp = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'Gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    smtp.sendMail({
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'PDF',
        text: 'Please find the attached PDF',
        attachments: [
            {
                filename: 'invoice.pdf',
                content: attachment,
                encoding: 'base64',
                type: 'application/pdf',
                disposition: 'attachment'
            }
        ]
    }, function (err, info) {
        if (err) {
            console.error('Error sending email:', err); // Log error details
            return res.status(500).send('Error sending email'); // Send a more generic error message to the client
        }
        res.send('Email sent successfully');
    });
};
