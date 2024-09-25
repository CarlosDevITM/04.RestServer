const { Router } = require("express");
const { uploadFile } = require("../controllers/uploadsController");

const router = Router();

router.post("/", uploadFile);

module.exports = router;
