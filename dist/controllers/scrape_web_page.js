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
exports.scrapeWebPage = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const summarize_web_page_1 = require("./summarize_web_page");
const scrapeWebPage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: true });
    const page = yield browser.newPage();
    yield page.goto(url, {
        // use networkidle0 to scrape the complete page (all requests finished loading)
        waitUntil: "domcontentloaded",
    });
    const content = yield page.evaluate(() => document.body.outerHTML);
    yield browser.close();
    const summary = yield (0, summarize_web_page_1.summerizeWebPage)(content);
    return summary;
});
exports.scrapeWebPage = scrapeWebPage;
