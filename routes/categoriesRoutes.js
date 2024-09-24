const { Router } = require("express");
const categoriesControllers = require("../controllers/categoriesControllers");
const { validateJWT } = require("../helpers/validateJWT");
const { hasRole } = require("../helpers/hasRoleValidation");

const router = Router();
//GetAllCategories
router.get("/", categoriesControllers.getAllCategories);

//GetOneCategory
router.get("/:id", categoriesControllers.getOneCategory);

//PostCategory
router.post(
  "/",
  validateJWT,
  //Validar cual categoría debería tener para funcionar
  hasRole("ventas", "user", "admin"),
  categoriesControllers.postCategory
);

//PutCategory
router.put(
  "/:id",
  validateJWT,
  hasRole("ventas", "user", "admin"),
  categoriesControllers.putCategory
);

//DeleteCategory
router.delete(
  "/:id",
  validateJWT,
  hasRole("admin"),
  categoriesControllers.deleteCategory
);

module.exports = router;
//googleValidators
