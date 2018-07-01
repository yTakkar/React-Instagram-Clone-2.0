import { uniqBy } from 'lodash'

export const addTag = (tags, t) => {
  tags.unshift(t)
  return uniqBy(tags, 'tag')
}

export const deleteTag = (tags, value) => tags.filter(t => t.tag != value)
