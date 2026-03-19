import { defineQuery } from 'next-sanity'

export const homepageQuery = defineQuery(`*[_type == "homepage"][0]`)
