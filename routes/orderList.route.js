const express = require(`express`);
const router = express.Router();

const OrderListController = require(`../controllers/orderList.controller`);

router.get("/", OrderListController.getAllList);
router.get("/:key", OrderListController.findList);
router.post("/", OrderListController.addList);
router.put("/:id", OrderListController.updateList);
router.delete("/:id", OrderListController.deleteList);

module.exports = router;