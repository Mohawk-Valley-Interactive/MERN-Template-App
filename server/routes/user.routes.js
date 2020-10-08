import express from "express";
import authCtrl from "../controllers/auth.controllers";
import userCtrl from "../controllers/user.controllers";

const router = express.Router();

router
  .route("/api/users")
  .get(userCtrl.list)
  .post(userCtrl.create);

router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, userCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, userCtrl.hasAuthorization, userCtrl.remove);

router.param("userId", userCtrl.userById);

export default router;
