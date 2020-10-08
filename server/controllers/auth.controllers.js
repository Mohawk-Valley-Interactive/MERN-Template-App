import expressJwt from "express-jwt";
import jwt from "jsonwebtoken";

import config from "./../../config/config";
import User from "./../model/user.model";

const signin = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.status("401").json({
        error: "User not found"
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status("401").json({
        error: "Email and password don't match."
      });
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      config.jwtSecret
    );

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  });
};

const signout = (req, res) => {
  return res.status("200").json({
    message: "Signed out."
  });
};

// NOTE: This method will extract the JWT from the 'Authorization: Bearer <TOKEN>' header and then
//       populate the `userProperty` into the req object (in this case, into `req.auth`).
const requireSignin = expressJwt({
  userProperty: "auth",
  secret: config.jwtSecret,
  algorithms: ['HS256']
});

export default { signin, signout, requireSignin };
