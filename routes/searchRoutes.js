const { Router } = require("express");
const { searchCollections } = require("../controllers/searchController");

const router = Router();

router.get("/:collection/:searchKey", searchCollections);

module.exports = router;
