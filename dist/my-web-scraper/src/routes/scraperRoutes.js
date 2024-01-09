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
const express_1 = __importDefault(require("express"));
const scraperController_1 = __importDefault(require("../controllers/scraperController"));
const router = express_1.default.Router();
const scraperController = new scraperController_1.default();
router.get('/', (req, res) => {
    res.render('index');
});
router.post('/scrape', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.body.url;
    try {
        const summary = yield scraperController.getSummary(url);
        res.json({ summary });
    }
    catch (error) {
        res.status(500).json({ error: 'Error scraping website' });
    }
}));
exports.default = router;
