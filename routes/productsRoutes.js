const { Router } = require("express");
const productsControllers = require("../controllers/productsControllers");
const { validateJWT } = require("../helpers/validateJWT");
const { hasRole } = require("../helpers/hasRoleValidation");

const router = Router();
//GetAllCategories
router.get("/", productsControllers.getProducts);

//GetOneCategory
router.get("/:id", productsControllers.getOneProduct);

router.post(
  "/",
  validateJWT,
  //Validar cual rol debería tener para funcionar
  hasRole("ventas", "user", "admin"),
  productsControllers.postProducts
);

router.put(
  "/:id",
  validateJWT,
  hasRole("ventas", "user", "admin"),
  productsControllers.putProducts
);

//DeleteCategory
router.delete(
  "/:id",
  validateJWT,
  hasRole("admin"),
  productsControllers.deleteProducts
);

module.exports = router;
