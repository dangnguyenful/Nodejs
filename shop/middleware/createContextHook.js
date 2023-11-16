const ah = require("../utils/hook");
const createContextHook = (request, response, next) => {
  const data = { headers: request.headers };
  ah.createRequestContext(data);
  next();
};
module.exports = createContextHook;
