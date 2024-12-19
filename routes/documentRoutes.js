const express = require("express");
const router = express.Router();
const documentsController = require("../controllers/documentCntroller");

router.post("/create", documentsController.createDocument);
router.post("/delete", documentsController.deleteDocumentById);
router.post("/update", documentsController.deleteDocumentById);
router.get("/all", documentsController.getAllDocuments);

module.exports = router;
