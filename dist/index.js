"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variables_1 = require("./utils/variables");
const routes_1 = __importDefault(require("./routes"));
const error_1 = __importDefault(require("./middlewares/error"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' });
app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.use(error_1.default);
app.listen(variables_1.PORT, () => console.log(`App running on port ${variables_1.PORT}`));
