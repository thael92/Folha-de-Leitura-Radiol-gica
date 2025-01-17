const express = require('express');
const router = express.Router();
const FormController = require('../controllers/FormController');
const auth = require('../middleware/auth');

// Rotas públicas
router.get('/forms/public', FormController.getPublicForms);

// Rotas protegidas
router.use(auth); // Middleware de autenticação

// CRUD básico
router.post('/forms', FormController.create);
router.get('/forms', FormController.list);
router.get('/forms/:id', FormController.getById);
router.put('/forms/:id', FormController.update);
router.delete('/forms/:id', FormController.delete);

// Rotas específicas
router.post('/forms/draft', FormController.saveDraft);
router.post('/forms/:id/submit', FormController.submit);
router.get('/forms/:id/pdf', FormController.generatePDF);
router.get('/forms/search', FormController.search);

module.exports = router; 