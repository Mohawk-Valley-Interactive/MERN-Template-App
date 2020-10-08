import { signout as callSignOut } from "./api-auth.js";

// TODO: Figure out why changing this to a standard set of methods (like in api-auth.js) seems to break all the things.
const auth = {
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (localStorage.getItem("jwt"))
      return JSON.parse(localStorage.getItem("jwt"));
    else return false;
  },

  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      localStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },

  signout(cb) {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    cb();
    //optional
    callSignOut();
  },
};

export default auth;
