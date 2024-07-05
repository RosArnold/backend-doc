const express = require("express");
const {
  getDocuments,
  searchDocuments,
  uploadDocuments,
  getDocument,
  updateDocument,
  shareDocument,
  getSharedDocuments,
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
router.post("/:id/shared", authMiddleware, shareDocument);
router.get("/:id/shared", authMiddleware, getSharedDocuments);
router.get("/:id/download", authMiddleware, downloadDocument);
router.delete("/:id", authMiddleware, deleteDocument);

module.exports = router;
