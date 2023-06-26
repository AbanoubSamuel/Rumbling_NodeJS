import {Router} from "express";
import {getUsers} from "../../controllers/user/user/user.controller";

const userRouter = Router();

userRouter
    .route("/")
    .all(getUsers)
    .get();


export default userRouter;
