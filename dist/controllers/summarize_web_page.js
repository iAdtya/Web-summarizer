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
exports.summerizeWebPage = void 0;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default();
const summerizeWebPage = (content) => __awaiter(void 0, void 0, void 0, function* () {
    // i have to pipe the content of the web page into this function
    // and then return the summary
    const completion = yield openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "Web-Summarizer is a bot which takes scraped website text and explains in brief about the content of the page ",
            },
            { role: "user", content: content },
        ],
        model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
});
exports.summerizeWebPage = summerizeWebPage;
