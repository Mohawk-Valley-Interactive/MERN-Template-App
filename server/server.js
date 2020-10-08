import fs from "fs";
import https from "https";
import mongoose from "mongoose";

import app from "./express";
import config from "./../config/config";
import devBundle from "./devBundle";

devBundle.compile(app);

try {
  const certInfo = {
    cert: fs.readFileSync(config.cert),
    key: fs.readFileSync(config.key)
  };
  https.createServer(certInfo, app).listen(config.port, function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info("Secure server started on port %s", config.port);
  });
} catch (e) {
  console.log("Failed to start server securely.")
  console.log(e.message);
  app.listen(config.port, function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info("INSECURE server started on port %s", config.port);
  });
}

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useUnifiedTopology: true, 
  useNewUrlParser: true
});
mongoose.connection.on("error", () => {
  throw new Error("Unable to connect to database: ${mongoUri}");
});