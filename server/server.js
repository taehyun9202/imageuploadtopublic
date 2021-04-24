const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const port = 8000;

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(fileUpload());

app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file Uploaded" });
  } else {
    const file = req.files.file;
    file.mv(`${__dirname}/../client/public/uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
