const express = require('express');
const {
  getDocuments,
  searchDocuments,
  uploadDocument,
  getDocument,
  updateDocument,
  shareDocument,
  deleteDocument,
} = require('../controllers/document');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getDocuments);
router.get('/:keyword', authMiddleware, searchDocuments);
router.post('/', authMiddleware, uploadDocument);
router.get('/:id', authMiddleware, getDocument);
router.patch('/:id', authMiddleware, updateDocument);
router.put('/:id', authMiddleware, shareDocument);
router.delete('/:id', authMiddleware, deleteDocument);

module.exports = router;