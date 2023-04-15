import axios from 'axios'
import config from './config.json'
import { ISection } from './lib/ISection'

const instance = axios.create({
  baseURL: 'https://cms.seattleu.edu/terminalfour/rs/',
  headers: {
    'Authorization': `Bearer ${config.token}`
  }
})

const getSection = async (sectionID: number): Promise<ISection> => {
  return (await instance.get(`hierarchy/${sectionID}/en`)).data
}

const createSection = async (options: ISection): Promise<ISection> => {
  return (await instance.post(`hierarchy/en`, options)).data
}

async function main() {
  try {
    const newSection = await createSection({
      name: "Wohoo",
      parent: 204148,
    })
    console.log(newSection)
  } catch (e) {
    console.log(e)
  }
}

main()