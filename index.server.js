import joystick from "@joystick.js/node";
import api from "./api/index.js";
import routes from "./routes/index.js";
import websockets from "./websockets/index.js";

joystick.app({
  api,
  routes,
  websockets,
});
