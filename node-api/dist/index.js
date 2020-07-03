"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const PORT = process.env.PORT || 8080;
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use('/api/v0', routes_1.default);
app.listen(PORT, () => console.log(`Api it's running on PORT: ${PORT}`));
//# sourceMappingURL=index.js.map