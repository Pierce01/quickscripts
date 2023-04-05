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
const axios_1 = __importDefault(require("axios"));
const config_json_1 = __importDefault(require("./config.json"));
const instance = axios_1.default.create({
    baseURL: 'https://cms.seattleu.edu/terminalfour/rs/',
    headers: {
        'Authorization': `Bearer ${config_json_1.default.token}`
    }
});
const getSection = (sectionID) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield instance.get(`hierarchy/${sectionID}/en`)).data;
});
const createSection = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield instance.post(`hierarchy/en`, options)).data;
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newSection = yield createSection({
                name: "New Test!",
                parent: 204148,
            });
            console.log(newSection);
        }
        catch (e) {
            console.log(e);
        }
    });
}
main();
