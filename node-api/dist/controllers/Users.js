"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || 'Mp8n7yQn7M';
const usersdb = [{
        id: "it-drixit-1",
        avatar: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
        email: "oteroeiras@gmail.com",
        password: "napal123",
        name: "IT",
        surname: "Drixit",
        age: 25,
        role: "admin"
    }, {
        id: "info-drixit-2",
        avatar: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
        email: "info@drixit.com",
        password: "other-password",
        name: "Info",
        surname: "Drixit",
        age: 30,
        role: "user"
    }];
exports.authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = usersdb.filter((u) => u.email === req.body.email)[0];
        if (!user)
            throw new Error("user_not_found");
        if (user.password !== req.body.password)
            throw new Error("password_incorrect");
        const token = jsonwebtoken_1.default.sign({ id: user.id }, SECRET_KEY, { expiresIn: 60 * 60 * 24 });
        res.send({ user, token });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : req.query.token;
        if (!token)
            throw new Error("not_token");
        jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, user) => {
            if (err)
                throw new Error("invalid_token");
            const me = usersdb.filter((u) => u.id === user.id)[0];
            res.send(me);
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error);
    }
});
//# sourceMappingURL=Users.js.map