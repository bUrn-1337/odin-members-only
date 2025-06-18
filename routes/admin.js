const { Router } = require("express");
const adminRouter = Router();
const adminController = require("../controllers/adminController");
const { ensureAuthenticated } = require("../middlewares/auth");

adminRouter.get("/", ensureAuthenticated, adminController.getBecomeAdmin);
adminRouter.post("/", ensureAuthenticated, adminController.postBecomeAdmin);

module.exports = adminRouter;