import _ from "lodash";

import User from "./../model/user.model";
import errorHandler from "./../helpers/dbErrorHandler";

const create = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
        message: err.message
      });
    }

    return res.status(200).json({
      message: "Successfully signed up!"
    });
  });
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }

    return res.json(users);
  }).select("name email updated created");
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);
};

const update = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save(err => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage()
      });
    }

    user.hashed_password = undefined;
    user.salt = undefined;
    return res.json(user);
  });
};

const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }

    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    return res.json(deletedUser);
  });
};

// NOTE: This method requires that the methods preceeding it populate the `req.auth` and `req.profile`
//       objects. `req.auth` is typically populated by the `requireSignin()` method from `auth.controller.js`. `req.profile`
//       on the other hand will be populated by the `userById()` method being called for routes 
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized."
    });
  }
  next();
};

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status("400").json({
        error: "User not found."
      });
    }

    req.profile = user;
    next();
  });
};

export default { create, list, read, update, remove, hasAuthorization, userById };
