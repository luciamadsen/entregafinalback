const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');

// Configuración de Multer (simplificada)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/', userController.getUsers);
router.delete('/', userController.deleteInactiveUsers);
router.post('/:uid/documents', upload.array('documents'), (req, res) => {
});


module.exports = router;
