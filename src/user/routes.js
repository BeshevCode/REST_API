const { Router } = require("express");   //Using a curly brackets to import a specific method from a package.
const userRouter = Router();
const { createUser, tokenLogin, deleteUser, updateUser } = require("./controllers");
const { hashPassword, unHash, tokenCheck } = require("../middleware");

userRouter.post("/user", hashPassword, createUser);
userRouter.get("/user", tokenCheck, tokenLogin);
userRouter.post("/login", unHash, tokenLogin);

userRouter.delete("/user", deleteUser);

userRouter.put("/user", updateUser);

module.exports = userRouter;