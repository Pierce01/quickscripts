import { Client, Types } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import { url, token } from './config.js'
import XLSX from 'xlsx-js-style'
import { stat } from 'fs/promises'
import { resolve } from 'node:path'

const { contentType, content, list, serverSideLink, upload, hierarchy } = new Client(url, token)

const ssls = await serverSideLink.util.getFromSection(204310)

console.log(ssls)

// for(let ssl of ssls) {
//   console.log(await serverSideLink.delete(ssl))
// }