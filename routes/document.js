const express = require("express");
const {
  getDocuments,
  searchDocuments,
  uploadDocuments,
  getDocument,
  updateDocument,
  shareDocument,
  getSharedDocumentsAndFolders,
  downloadDocument,
  deleteDocument,
} = require('../controllers/document');
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/", authMiddleware, getDocuments);
router.get("/:keyword/search", authMiddleware, searchDocuments);
router.post("/", authMiddleware, uploadDocuments);
router.get("/:id", authMiddleware, getDocument);
router.put("/:id", authMiddleware, updateDocument);
router.post("/:id/share", authMiddleware, shareDocument);
router.get("/shared", authMiddleware, getSharedDocumentsAndFolders);
router.get("/:id/download", authMiddleware, downloadDocument);
router.delete("/:id", authMiddleware, deleteDocument);

module.exports = router;
