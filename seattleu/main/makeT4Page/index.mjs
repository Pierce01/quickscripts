import { Client } from '../../../../t4apiwrapper/t4.ts/esm/index.js'
import { url, token } from './config.js'
import XLSX from 'xlsx-js-style'
import * as fs from 'fs';


const workbook = XLSX.readFile('./book.xlsx')
for (let sheet of workbook.SheetNames) {
  console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
}

// const sectionId = 204310
// console.log(await serverSideLink.util.getFromSection(sectionId))


// const serverSideLinks = []
// const contentIds = (await hierarchy.getContents(sectionId)).contents.map(content => content.id)
// await Promise.all(contentIds.map(async contentId => {
//   const { types, elements, id } = await content.get(contentId, sectionId, 'en')
//   if (!types.some(entry => entry.id == linkType)) return
//   const keys = Object.keys(elements).filter(name => name.split(':').pop() == linkType)
//   const maxId = Math.max(...keys.map(key => elements[key].match(regex)?.[1]).filter(entry => entry != null).map(Number))
//   if (!maxId) return
//   for (let i = 1; i <= maxId; i++) {
//     const link = await serverSideLink.get(i, sectionId, id)
//     if (link.id) serverSideLinks.push(await serverSideLink.get(i, sectionId, id))
//   }
// }))
// console.log(await hierarchy.getSection(204310, {
//   showLinkSections: true
// }))

// console.log(await serverSideLink.set({
//   fromSection: 204310,
//   fromContent: 6963487,
//   language: 'en',
//   toSection: 206279,
//   linkText: 'test',
//   useDefaultLinkText: false
// }))

// console.log(await serverSideLink.getSelectedContentsLinks([367530, 367611]))

// console.log((await content.getServerSideLinks(204310)))

// const list = await contentType.list()
// const user = await profile.get()
// const pc = await contentType.get(5135)
// console.log(pc)

// console.log(await hierarchy.get(204310, 'en'))
// const prep = await content.prePopulatedContentInfo(187, 204310)

// console.log(await content.create(204310, {
//   contentTypeID: 187,
//   elements: {
//     'Name': 'Api Test!!',
//     'Content': '<p>hiiii <3</p>'
//   },
//   language: 'en',
//   status: 0
// }))
// console.log(prep)
// console.log(pc, user)
// const format = content.util.getElementNames(pc.contentTypeElements)
// console.log(content.util.mapElementValues({
//   'Name': 'Test!!',
//   'Content': 'Test!!!!!!!'
// }, format))