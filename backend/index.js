import express from "express";

const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from webuzz server");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
