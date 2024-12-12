// Backend Code (Node.js)
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const sequelize = require("./config/database");
const Document = require("./models/documentModel");
const documentRote = require("./routes/documentRoutes")

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
})();

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Load the initial document
  socket.on("get-document", async (docId) => {
    let document = await Document.findOne({ where: { id: docId } });
    if (!document) {
      document = await Document.create({
        id: docId,
        name: `Document ${docId}`,
        doc: JSON.stringify({ ops: [] }), // Ensure Delta format is stored
      });
    }
    try {
      const parsedDoc = JSON.parse(document.doc);
      socket.emit("document", parsedDoc);
    } catch (error) {
      console.error("Error parsing document content:", error);
      socket.emit("document", { ops: [] }); // Fallback to empty content
    }
  });

  // Update the document in the database
  socket.on("update-document", async ({ docId, content }) => {
    try {
      await Document.update(
        { doc: JSON.stringify(content) }, // Store as JSON string
        { where: { id: docId } }
      );
      socket.broadcast.emit("document", content); // Broadcast updates
    } catch (error) {
      console.error("Error updating document:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
  });
});

// Route configuration
app.use("/documents", documentRote);

const port = 4000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
