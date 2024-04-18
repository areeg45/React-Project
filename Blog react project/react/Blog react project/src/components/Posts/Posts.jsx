import React, { useContext } from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { Context } from '../context/Context'

export default function Posts({posts}) {
  const {user}=useContext(Context);
  return (
    <div className='posts'>
      {posts.map(p=>(
        <Post post={p}></Post>
      ))}
      {/* <Post></Post> */}

    </div>
  )
}
