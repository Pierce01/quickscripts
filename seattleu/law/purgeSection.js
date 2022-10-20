const constantHeaders = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
}

const constantEntry = {
    "method": "POST",
    "mode": "cors",
    "credentials": "include",
    "referrer": "https://cms.seattleu.edu/terminalfour/page/recycleContent",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null
}

const deleteQueueContent = []
const deleteQueueSection = []
const blacklist = []

// Get's the specific section's information, including their subsections if that wasn't populated.
async function getSectionInfo(id) {
    return (await (await fetch("https://cms.seattleu.edu/terminalfour/rs/hierarchy/section", {
        "headers": {
          "authorization": `Bearer ${JSON.parse(window.sessionStorage.__oauth2).accessToken}`,
          ...constantHeaders
        },
        ...constantEntry,
        "referrer": "https://cms.seattleu.edu/terminalfour/page/site-structure",
        "body": JSON.stringify({
            "read": {
                "section": {
                    id,
                    "language": "en"
                },
                "recursionDepth": 1,
                "activeNode": id,
                "explode": false,
                "showContentInfo": true,
                "showWidget": true,
                "openNodes": [id],
                "showFullTree": false,
                "restrictedToPermitedSections": false,
                "expandCollapseAllChildren": false
            }
        })
      })).json())[0]
}

async function purgeSectionIDs (array) {
    await fetch("https://cms.seattleu.edu/terminalfour/rs/hierarchy/purge", {
        "headers": {
            "authorization": `Bearer ${JSON.parse(window.sessionStorage.__oauth2).accessToken}`,
            ...constantHeaders
        },
        ...constantEntry,
        "body": JSON.stringify({
            "languageCode":"en",
            "contentIds": array
        })
    })
}

async function purgeContentIDs (array) {
    await fetch("https://cms.seattleu.edu/terminalfour/rs/content/purge", {
        "headers": {
            "authorization": `Bearer ${JSON.parse(window.sessionStorage.__oauth2).accessToken}`,
            ...constantHeaders
        },
        ...constantEntry,
        "body": JSON.stringify({
            "languageCode":"en",
            "contentIds": array
        })
    })
}

async function troll (obj) {
    if (blacklist.includes(obj.id)) return
    console.log("Trolling started for " + obj.id)
    if (!hasChildren(obj)) {
        deleteQueueSection.push(obj.id)
        return
    }

    if (hasChildren(obj) && (obj.subsections.length == 0)) {
        console.log("Getting subsections for " + obj.id)
        obj = await getSectionInfo(obj.id)
    }

    // If section has content entries, add them to the delete queue.
    if (((obj.countContentApproved + obj.countContentInactive + obj.countContentPending) > 0)) {
        console.log("Getting content ids from " + obj.id)
        const children = await getContentIDsFromSection(obj.id)
        for (let child of children) {
            if (canDelete(child, 1)) deleteQueueContent.push(child.id)
        }
    }

    // If section has subsections, troll their content & subsections before adding them to the delete queue.
    if (obj.subsections) {
        console.log("Trolling subsections")
        for (let entry of obj.subsections) {
            await troll(entry)
            if (canDelete(entry, 0)) deleteQueueSection.push(entry.id)
        }
    }
}

async function getContentIDsFromSection (id) {
    return (await (await fetch(`https://cms.seattleu.edu/terminalfour/rs/hierarchy/${id}/en/contents?showAll=true&removeNonTranslated=false`, {
        "headers": {
            "authorization": `Bearer ${JSON.parse(window.sessionStorage.__oauth2).accessToken}`,
            ...constantHeaders
        },
        ...constantEntry,
        "method": "GET"
        })).json()).children
}

function canDelete (obj, type) {
    switch (type) {
        // Section type
        case 0: {
            return obj["mirror-type"] == "none"
        }
        // Content type
        case 1: {
            return Object.keys(obj.content.mirroredSectionPaths).length === 0
        }
        // Default case
        default: {
            return false
        }
    }
}

function hasChildren (obj) {
    return (obj.hasChildren || ((obj.countContentApproved + obj.countContentInactive + obj.countContentPending) > 0))
}

async function getPermission () {
    return ((await (await fetch("https://cms.seattleu.edu/terminalfour/rs/profile", {
        "headers": {
            "authorization": `Bearer ${JSON.parse(window.sessionStorage.__oauth2).accessToken}`,
            ...constantHeaders
        },
        ...constantEntry,
        "referrer": "https://cms.seattleu.edu/terminalfour/page/content",
        "method": "GET"
        })).json()).userLevel) == 0
}

async function main (id) {
    if (await getPermission()) {
        const json = await getSectionInfo(id)
        await troll(json)
        purgeSectionIDs(deleteQueueSection)
        purgeContentIDs(deleteQueueContent)
        deleteQueueSection.length = 0;
        deleteQueueContent.length = 0;
    } else {
        alert("User is not an admin")
    }
}
