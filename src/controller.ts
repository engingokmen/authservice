import jwt from "jsonwebtoken";
import { User } from "./model.js";
import { Response, Request } from "express";
import { crypto } from "./utils.js";

class UserController {
  async signin(req: Request, res: Response) {
    const { email: reqEmail, password } = req.body;
    const user = await User.findOne({ email: reqEmail }).exec();
    if (!user) {
      res.json({ msg: "user does not exist" });
    }
    const { name, lastname, email } = user;
    const authenticated = await crypto.compare(password, user.password);
    if (authenticated === true) {
      const token = jwt.sign({ name, lastname, email }, process.env.SECRET_KEY);
      res.json({ token });
    } else {
      res.json({ token: "not successfull" });
    }
  }

  async signup(req: Request, res: Response) {
    const { name, lastname, email, password } = req.body;
    const encrypted = await crypto.encrypt(password);

    const user = new User({ name, lastname, email, password: encrypted });

    try {
      await user.save();
      delete user.password;
      res.json(user);
    } catch (err) {
      console.log("err", err);
      res.send(err);
    }
  }
}

export const user = new UserController();
