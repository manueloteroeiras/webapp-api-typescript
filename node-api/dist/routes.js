"use strict";
const express_1 = require("express");
const Users_1 = require("./controllers/Users");
const router = express_1.Router();
router.post('/authenticate', Users_1.authenticate);
router.get('/users/me', Users_1.getMe);
module.exports = router;
//# sourceMappingURL=routes.js.map