"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const path_1 = require("path");
const scraperRoutes_1 = __importDefault(require("./routes/scraperRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use(express_1.default.static((0, path_1.join)(__dirname, '../public')));
// View engine setup
app.set('view engine', 'ejs');
app.set('views', (0, path_1.join)(__dirname, './views'));
// Routes
app.use('/', scraperRoutes_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
