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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScraperController = void 0;
const scraperService_1 = require("../services/scraperService");
class ScraperController {
    constructor() {
        this.scraperService = new scraperService_1.ScraperService();
    }
    scrapeWebsite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = req.body.url;
                const scrapedText = yield this.scraperService.scrapeWebsite(url);
                const summary = yield this.scraperService.summarizeText(scrapedText);
                res.render('index', { summary: summary });
            }
            catch (error) {
                res.status(500).send({ error: 'An error occurred while scraping the website.' });
            }
        });
    }
}
exports.ScraperController = ScraperController;
