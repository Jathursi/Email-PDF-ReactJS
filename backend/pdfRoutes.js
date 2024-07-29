import express from 'express';
import { createPdf, fetchPdf, sendPdf } from './pdfController.js';

const pdfRoutes = express.Router();

pdfRoutes.post('/createpdf', createPdf);
pdfRoutes.get('/fetchPdf', fetchPdf);
pdfRoutes.post('/sendPdf', sendPdf);

export default pdfRoutes;