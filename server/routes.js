const router = require("express").Router();
const controller = require("./controllers");

router.get("/currentPrices", controller.getCurrentPrices);
// router.post("/", controller.createBudget);
// router.delete("/:id", controller.deleteBudget);
// router.put("/:id", controller.updateBudget);
// router.get("/category", controller.getAllCategories);

module.exports = router;
