import Link from 'next/link'
import React from 'react'

export const Posts = ({posts}) => {
  return (
    <>
    <ul className="
      list-none
      space-y-4
      text-4xl 
      font-bold
      mb-3
    ">
      {
        posts && posts.data.map(post => {
          return (
            <li key={post?.id}>
              <Link href={`/forums/post/${post?.attributes?.slug}`}>
                <a>{post?.attributes?.title}</a>
              </Link>
            </li>
          )
        })
      }
    </ul>
    </>
  )
}
