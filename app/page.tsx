import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { sanityFetch } from '@/lib/sanity/live'
import { homepageQuery } from '@/lib/sanity/queries'
import HomeClient from './HomeClient'

export default async function Home() {
  let data = null
  try {
    const result = await sanityFetch({ query: homepageQuery })
    data = result.data
  } catch {
    // No Sanity project configured yet — render with default content
  }
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <>
      <HomeClient data={data} />
      {isDraftMode && <VisualEditing />}
    </>
  )
}
