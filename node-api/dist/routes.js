"use strict";
const express_1 = require("express");
const Users_1 = require("./controllers/Users");
const router = express_1.Router();
router.get('/', Users_1.index);
module.exports = router;
//# sourceMappingURL=routes.js.map