import React, { useContext } from 'react'
import './Post.css'
import {Link, Route} from "react-router-dom"
import { Context } from '../context/Context';

export default function Post({post}) {
  const createdAtDate = new Date(post.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  const{user} = useContext(Context);
  const puplicFile = "http://localhost:5000/images/"
  return (
    <div className='post'>
      {post.photo&&(
      <img className='postImg' src={puplicFile + post.photo} />
    )}
    <div className="postInfo">
        <div className="postCats">
          {post.categories.map(c=>{
            <span className='postCats'>{c.name}</span>
          })}
           <Link to={`/post?/${post._id}`} className='link'>
                <span className='postTitle '>
                  {post.title} 
                </span>
           </Link>
        </div>
        <hr />
        {/*
                    <div className="userInfo">
                    <img src={puplicFile + user.profilePic} alt="Profile" className="profilePic" />
                    <span className='username'>{user.username}</span>
                </div>

                )} */}
        <hr />
        <span className='postDate'>{formattedDate.toString()}</span>
    </div>
    <div className="postDesc">
        <p>{post.desc}</p>
    </div>

    </div>
  )
}

