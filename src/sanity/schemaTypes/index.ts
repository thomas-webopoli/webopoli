import siteSettings from './siteSettings'
import hero from './hero'
import philosophie from './philosophie'
import service from './service'
import projet from './projet'

export const schemaTypes = [
  siteSettings,
  hero,
  philosophie,
  service,
  projet,
]

export const schema = {
  types: schemaTypes,
}
