import pdfTemplate from './documents/document.js';

export const fetchHtml = (req, res) => {
    const data = {
        name: 'John Doe',
        price1: 100,
        price2: 200,
        price3: 300,
        reciept: '12345',
        email: 'john.doe@example.com'
    };
    const html = pdfTemplate(data);
    res.send(html);
};