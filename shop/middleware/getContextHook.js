const ah = require("../utils/hook");
const getContextHook = (request, response, next) => {
  const reqContext = ah.getRequestContext();
  console.log(reqContext);
  next();
};
module.exports = getContextHook;
