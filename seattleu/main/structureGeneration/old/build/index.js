import axios from 'axios';
import * as fs from 'fs';
import config from './config.json' assert { type: "json" }
const instance = axios.create({
    baseURL: 'https://cms.seattleu.edu/terminalfour/rs/',
    headers: {
        'Authorization': `Bearer ${config.token}`
    }
});
const axiosError = (error) => {
    if (axios.isAxiosError(error)) {
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
            id: subsection.id,
            name: subsection.name,
            status: subsection.status,
            children: parseSubsections(subsection.subsections)
        };
    });
};
async function main() {
    try {
        const initParentID = 204310;
        // Generate based off of structure.json
        const inputFile = JSON.parse(fs.readFileSync('./Basic.json', { encoding: 'utf-8' }));
        await recursiveCreation(initParentID, inputFile.nodeStructure.children);
        console.log((await getSection(initParentID)));
    }
    catch (e) {
        console.log(e);
    }
}
main();
//# sourceMappingURL=index.js.map