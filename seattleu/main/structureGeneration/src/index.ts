import axios from 'axios'
import * as fs from 'fs'
import config from './config.json'
import { ISection, ICreateSection } from './lib/ISection'

interface ssvObject {
  text: { name: string },
  children: ssvObject[]
}

interface d3Object {
  name: string,
  children: d3Object[]
}

interface subsection {
  id: number,
  name: string ,
  subsections: subsection[]
}

const instance = axios.create({
  baseURL: 'https://cms.seattleu.edu/terminalfour/rs/',
  headers: {
    'Authorization': `Bearer ${config.token}`
  }
})

const axiosError = (error:any) => {
  if (axios.isAxiosError(error)) {
    console.log(error.code)
  } else {
    console.error(error)
  }
  return null
} 

const getSection = async (id: number, expandCollapseAllChildren: boolean = true) => {
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
    })).data
  } catch (error) {
    return axiosError(error)
  }
}

const createSection = async (options: ICreateSection): Promise<ISection | null> => {
  try {
    return (await instance.post(`hierarchy/en`, options)).data
  } catch (error) {
    return axiosError(error)
  }
}

const recursiveCreation = async (parent: number, children: ssvObject[]) => {
  let parentSection = await getSection(parent)
  if (parentSection && parentSection[0]) {
    await Promise.all(children.map(async child => {
      const newSection = await createSection({ name: child.text.name, parent, show: true })
      if (newSection) {
        console.log(`Created section ${child.text.name} and added to parent ${parent}`)
        await recursiveCreation(newSection.id, child.children)
      }
    }))
  }
}

const parseSubsections = (subsections: subsection[]): d3Object[] => {
  return subsections.map(subsection => {
    return {
      name: subsection.name,
      children: parseSubsections(subsection.subsections)
    }
  })
}

async function main() {
  try {
    const initParentID: number = 204310
    const inputFile = JSON.parse(fs.readFileSync('./Basic.json', { encoding: 'utf-8'}))
    await recursiveCreation(initParentID, inputFile.nodeStructure.children)

    // console.log((await getSection(initParentID)))


    // const parentSection = (await getSection(initParentID))[0]
    // const obj = {
    //   name: parentSection.names.en,
    //   children: parseSubsections(parentSection.subsections)
    // }

    // fs.writeFileSync('./file.json', JSON.stringify(obj, null, 0), { encoding: 'utf-8' })
  } catch (e) {
    console.log(e)
  }
}

main()