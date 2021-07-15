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
const deleteQueueContent = []
const deleteQueueSection = []
const blacklist = [193903]

// Get's the specific section's information, including their subsections if that wasn't populated.
async function getSectionInfo(id) {
    return (await (await fetch("https://cms.seattleu.edu/terminalfour/rs/hierarchy/section", {
        "headers": {
          "authorization": `Bearer ${JSON.parse(window.sessionStorage.__oauth2).accessToken}`,
          ...constantHeaders
        },
        "referrer": "https://cms.seattleu.edu/terminalfour/page/site-structure",
        "referrerPolicy": "strict-origin-when-cross-origin",
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
        }),
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      })).json())[0]
}

async function purgeSectionIDs (array) {
    await fetch("https://cms.seattleu.edu/terminalfour/rs/hierarchy/purge", {
        "headers": {
            "authorization": `Bearer ${JSON.parse(window.sessionStorage.__oauth2).accessToken}`,
            ...constantHeaders
        },
        "referrer": "https://cms.seattleu.edu/terminalfour/page/recycleContent",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify({
            "languageCode":"en",
            "contentIds": array
        }),
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    })
}

async function purgeContentIDs (array) {
    await fetch("https://cms.seattleu.edu/terminalfour/rs/content/purge", {
        "headers": {
            "authorization": `Bearer ${JSON.parse(window.sessionStorage.__oauth2).accessToken}`,
            ...constantHeaders
        },
        "referrer": "https://cms.seattleu.edu/terminalfour/page/recycleContent",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify({
            "languageCode":"en",
            "contentIds": array
        }),
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
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
            if (canDelete(child)) deleteQueueContent.push(child.id)
        }
    }

    // If section has subsections, troll their content & subsections before adding them to the delete queue.
    if (obj.subsections) {
        console.log("Trolling subsections")
        for (let entry of obj.subsections) {
            await troll(entry)
            if (canDelete(entry)) deleteQueueSection.push(entry.id)
        }
    }
}

async function getContentIDsFromSection (id) {
    return (await (await fetch(`https://cms.seattleu.edu/terminalfour/rs/hierarchy/${id}/en/contents?showAll=true&removeNonTranslated=false`, {
        "headers": {
            "authorization": `Bearer ${JSON.parse(window.sessionStorage.__oauth2).accessToken}`,
            ...constantHeaders
        },
        "referrer": "https://cms.seattleu.edu/terminalfour/page/section",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
        })).json()).children
}

function canDelete (obj) {
    // return obj["mirror-type"] == "none"
    return true
}

function hasChildren (obj) {
    return (obj.hasChildren || ((obj.countContentApproved + obj.countContentInactive + obj.countContentPending) > 0))
}

// Useless function
function getSections (array) {
    const kids = []
    const empty = []

    for (let obj of array) {
        hasChildren(obj)
            ? kids.push(obj)
            // Since we don't care about these sections, we can pass their IDs and delete them later on.
            : empty.push(`${obj.id}`)
    }

    return { kids, empty }
}

async function main (id) {
    const json = await getSectionInfo(id)
    await troll(json)
    console.log(deleteQueueSection)
    console.log(deleteQueueContent)
}

await main(185801)