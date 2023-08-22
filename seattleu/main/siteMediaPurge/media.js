import { call, get } from './api.js'

export async function getMedia(id) {
  const endpoint = `media/${id}/en`
  const content = await get(endpoint)
  if (!content) return null
  content['usage'] = await get(endpoint + '/usage')
  content.categories = await Promise.all(content.categories.map(async catId => await get(`mediacategory/${catId}/en`)))
  return content
}

export async function filterMedia(mediaArray) {
  return mediaArray.filter(media => {
    if (!media || media.usage.length >= 1) return false
    const ruleList = media.categories.map(category => category.mediaCategoryPublishRuleDTOs)
    const rules = ruleList.map(rules => rules.map(rule => rule.mediaTypeID))[0]
    return !rules.includes(parseInt(media.contentTypeID))
  })
}

export async function markInactive(mediaArray) {
  await mediaArray.forEach(async media => {
    const endpoint = `media/category/${media.categories[0].id}/id/${media.id}/${media.binaryLanguage}`
    try {
      const request = await call('DELETE', endpoint)
      if (parseInt(request.status) > 350) console.log(`Unexpected status code ${request.status} for ${media.id}`)
    } catch (error) {
      console.log(`Failed to mark ${media.id} as inactive due to ${error}`)
    }
  })
}