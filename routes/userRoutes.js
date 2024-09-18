const { Router } = require("express");
const {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
} = require("../controllers/userControllers");
const { validations } = require("../validators/userValidator");
const router = Router();

router.get("/", userGet);

router.post("/", validations, userPost);

router.put("/:id", validations, userPut);

router.patch("/", userPatch);

router.delete("/:id", userDelete);

module.exports = router;
