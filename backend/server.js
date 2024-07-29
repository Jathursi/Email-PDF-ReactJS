import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import pdfRoute from './pdfRoutes.js'; // Add .js extension
const app = express();
env.config();

const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use(pdfRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});