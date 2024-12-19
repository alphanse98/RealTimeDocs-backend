const Document = require("../models/documentModel");

exports.createDocument = async (req, res) => {
  try {
    console.log("upload api cal");
    const { name, doc } = req.body;
    const newDocument = await Document.create({ name, doc });
    res.status(201).json({
      message: "Document created successfully.",
      document: newDocument,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create document.",
      error: error.message,
    });
  }
};

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve documents.",
      error: error.message,
    });
  }
};

exports.deleteDocumentById = async (req, res) => {
  try {
    const { id } = req.body;

    await Document.destroy({
      where: { id },
    });

    res.status(200).json({
      message: "Document deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the document.",
      error: error.message,
    });
  }
};

