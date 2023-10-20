import {
  Document,
  Packer,
  Paragraph,
  TextRun
} from 'docx'
import * as htmlToText from 'html-to-text'
import { 
  parse 
} from 'node-html-parser'
import fetch from 'node-fetch'
import {
  writeFile
} from 'fs/promises'

const {
  convert
} = htmlToText

const urls = [
  'https://www.seattleu.edu/faculty-development/',
  'https://www.seattleu.edu/faculty-development/events/',
  'https://www.seattleu.edu/faculty-development/services/consultations/',
  'https://www.seattleu.edu/faculty-development/services/consultations/request/',
  'https://www.seattleu.edu/faculty-development/resources/syllabus-template/',
  'https://www.seattleu.edu/faculty-development/resources/',
  'https://www.seattleu.edu/faculty-development/resources/ncfdd/',
  'https://www.seattleu.edu/faculty-development/events/writing-groups/',
  'https://www.seattleu.edu/faculty-development/about-us/people/'
]

for (let url of urls) {
  const nameSplit = url.split('/'), name = nameSplit[nameSplit.length - 2]
  const text = convert(parse(await (await fetch(url)).text()).querySelector('#zoneA').toString())
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({
          children: text.split('\n').map(line => new TextRun({
            break: 1,
            text: line
          })),
        }),
      ],
    }, ]
  })

  Packer.toBuffer(doc).then((buffer) => {
    writeFile(`${name}.docx`, buffer);
  })
}