const fs = require('fs')
const jimp = require('jimp')

const presets = {
    img: {
        width: 200,
        height: 200
    },
    // This varies depending on the amount of profile pictures.
    grid: {
        row: 13,
        col: 19
    },
    cords: {
        x: 0,
        y: 0
    }
}
presets.grid.length = presets.img.width * presets.grid.col
presets.grid.width = presets.img.height * presets.grid.row


async function main() {
    // If pfps folder exists, lets start making our grid!
    if (fs.existsSync('./pfps')) {
        // Creating our canvas
        const canvas = new jimp(presets.grid.length, presets.grid.width, 0xFFFFFFFF)
        // Read all the downloaded profile pictures from the other script
        fs.readdir('./pfps', async (err, files) => {
            for(let file of files) {
                const src = await getSrc('./pfps/' + file)
                if (!src) continue
                console.log(`Added ${file} to the canvas.`)
                canvas.composite(src, presets.cords.x, presets.cords.y)
                updateCords()
            }
            canvas.write('./output.jpg')
        })
    } else {
        console.log("The profile picture folder does not exist.")
    }
}

function getSrc(path) {
    return new Promise(resolve => {
        jimp.read(path)
        .then(image => {
            if (image.bitmap.height != presets.img.height || image.bitmap.width != presets.img.width) image.resize(presets.img.width, presets.img.height)
            return resolve(image)
        })
        .catch(e => {
            console.log(`Failed to load ${path}.`)
            return resolve(false)
        })
    })
}

function updateCords() {
    if (presets.cords.x >= presets.grid.length) {
        presets.cords.x = 0
        presets.cords.y += presets.img.height
    } else {
        presets.cords.x += presets.img.width
    }
}

main()

