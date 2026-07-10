require("dotenv").config();
console.log(
  "Loaded key:",
  process.env.GEMINI_API_KEY?.slice(0, 10)
);
const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GrowEasy AI Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log("🚀 GROWEASY BACKEND STARTED");
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("Server Error:", err);
});