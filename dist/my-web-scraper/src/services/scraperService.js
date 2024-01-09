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
exports.ScraperService = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const axios_1 = __importDefault(require("axios"));
class ScraperService {
    scrapeWebsite(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.goto(url, { waitUntil: 'networkidle2' });
            const data = yield page.evaluate(() => document.body.innerText);
            yield browser.close();
            return data;
        });
    }
    summarizeText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt: text,
                max_tokens: 60
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            });
            if (response.data.choices && response.data.choices.length > 0) {
                return response.data.choices[0].text.trim();
            }
            return '';
        });
    }
}
exports.ScraperService = ScraperService;
