const Twitter = require('twitter')
const fs = require('fs')
const request = require('request')

const config = require('./config.json')
const client = new Twitter(config.twitter)
const size = config.size
const screen_name = config.screen_name

let cursor = -1
const mutuals = []
let friends = []

async function main() {
    while (await populateFriends({count: 200, cursor})) {}
    await getMutuals()
    await downloadPfps()
}

function downloadPfps() {
    return new Promise(async resolve => {
        if (!fs.existsSync('./pfps/')) {
            fs.mkdirSync('./pfps')
        }
        for (let mutual of mutuals) {
            const url = mutual.profile_image_url.replace('normal', size)
            request(url).pipe(fs.createWriteStream(`./pfps/${mutual.screen_name}-${size}.jpg`)).on('close', () => {
                console.log(`Downloaded ${mutual.screen_name}'s profile picture (${size}).`)
            })
        }
        resolve()
    })
}

function getMutuals() {
    return new Promise(resolve => {
        client.get('followers/ids', {
            screen_name,
            stringify_ids: true
        }, (err, body, resp) => {
            if (err) {
                console.error(error)
                process.exit(1)
            } else {
                for (let id of body.ids) {
                    for (let friend of friends) {
                        if (id.includes(friend.id_str)) {
                            mutuals.push(friend)
                            continue
                        }
                    }
                }
                resolve()
            }
        })
    })
}

function populateFriends(opts) {
    return new Promise(resolve => {
        let bool = true
        client.get('friends/list', {
            screen_name,
            ...opts
        }, function(error, friendsBody, response) {
            cursor = friendsBody.next_cursor
            if (error) {
                console.error(error)
                process.exit(1)
            } else {
                if (friendsBody.users.length < 200) {
                    bool = false
                }
                friends = friends.concat(friendsBody.users)
                return resolve(bool)
            }
        })
    })
}

main()