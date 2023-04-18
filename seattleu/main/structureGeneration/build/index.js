"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const config_json_1 = __importDefault(require("./config.json"));
const instance = axios_1.default.create({
    baseURL: 'https://cms.seattleu.edu/terminalfour/rs/',
    headers: {
        'Authorization': `Bearer ${config_json_1.default.token}`
    }
});
const axiosError = (error) => {
    if (axios_1.default.isAxiosError(error)) {
        console.log(error.code);
    }
    else {
        console.error(error);
    }
    return null;
};
const getSection = async (id, expandCollapseAllChildren = true) => {
    try {
        return (await instance.post(`hierarchy/section`, {
            read: {
                section: {
                    id,
                    language: 'en'
                },
                recursionDepth: 1,
                activeNode: id,
                explode: false,
                showContentInfo: true,
                showWidget: true,
                openNodes: [id],
                showFullTree: true,
                restrictedToPermitedSections: false,
                expandCollapseAllChildren
            }
        })).data;
    }
    catch (error) {
        return axiosError(error);
    }
};
const createSection = async (options) => {
    try {
        return (await instance.post(`hierarchy/en`, options)).data;
    }
    catch (error) {
        return axiosError(error);
    }
};
const recursiveCreation = async (parent, children) => {
    let parentSection = await getSection(parent);
    if (parentSection && parentSection[0]) {
        await Promise.all(children.map(async (child) => {
            console.log(child.text.name);
            const newSection = await createSection({ name: child.text.name, parent, show: true });
            if (newSection) {
                console.log(`Created section ${child.text.name} and added to parent ${parent}`);
                await recursiveCreation(newSection.id, child.children);
            }
        }));
    }
};
const parseSubsections = (subsections) => {
    return subsections.map(subsection => {
        return {
            name: subsection.name,
            children: parseSubsections(subsection.subsections)
        };
    });
};
async function main() {
    try {
        const initParentID = 204148;
        const inputFile = JSON.parse(fs.readFileSync('./Basic.json', { encoding: 'utf-8' }));
        await recursiveCreation(initParentID, inputFile.nodeStructure.children);
        // console.log((await getSection(initParentID)))
        // const parentSection = (await getSection(initParentID))[0]
        // const obj = {
        //   name: parentSection.names.en,
        //   children: parseSubsections(parentSection.subsections)
        // }
        // fs.writeFileSync('./file.json', JSON.stringify(obj, null, 0), { encoding: 'utf-8' })
    }
    catch (e) {
        console.log(e);
    }
}
main();
