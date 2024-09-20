const { Router } = require("express");
const {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
} = require("../controllers/userControllers");

const { validations } = require("../validators/userValidator");
const { validateJWT } = require("../helpers/validateJWT");
const { hasRole } = require("../helpers/hasRoleValidation");

const router = Router();

router.get("/", userGet);

router.post("/", validations, userPost);

router.put("/:id", validations, userPut);

router.patch("/", userPatch);

router.delete(
  "/:id",
  validateJWT,
  hasRole("admin", "user", "ventas"),
  userDelete
);

module.exports = router;
