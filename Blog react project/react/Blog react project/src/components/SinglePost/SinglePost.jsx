import React, { useContext, useEffect, useState } from 'react'
import './SinglePost.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// import users from '../../../../../api/models/users';
import { Context } from '../context/Context';

export default function SinglePost() {
    const location = useLocation();
const path = location.search.split("?/")[1];

const [post,setPost]= useState({})
// console.log(path);
const createdAtDate = new Date(post.createdAt);
const formattedDate = createdAtDate.toLocaleDateString('en-US', {
  weekday: 'short',
  month: 'short',
  day: '2-digit',
  year: 'numeric',
});
const puplicFile = "http://localhost:5000/images/"
const{user} = useContext(Context);
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const [update, setUpdate] = useState(false);



useEffect(() => {
    const getPost = async () => {
        const res = await axios.get("http://localhost:5000/api/posts/" + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);

        // console.log(res);
    };
    getPost(); 
}, [path]);
const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

const handleEdit =async ()=>{
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
    //   window.location.reload();
    setUpdate(false);
    } catch (err) {}
  };
    return (
        <div className='singlepost'>
            <div className="singlepostBody">
                {post.photo &&(
                <img className='singlePostImg' src={puplicFile + post.photo} />
                )}{
                    update ? <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} className="singlePostTitleInp"/>:(

                        
                    <h1 className='singlePostTitle'>{title}
                {post.username === user?.username&&(
                    <div className="singlePostEdit">
                        <i class="singlepostIcon fa-regular fa-pen-to-square"onClick={() => setUpdate(true)}></i>
                        <i class="singlepostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
                    </div>

                )}
                </h1>
                    )
                }

                <div className="singlepostInfo">
                    <span className='SinglepostUser'>
                        User: <b>{post.username}</b>
                    </span>
                    <span className='SinglepostDate'>
                    {formattedDate.toString()}
                    </span>
                </div> 
                {update ? (
                    <textarea className='singlepostDescInp' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                ):(
                    <p className='singlepostDesc'>{desc}</p>
                )}
                {update &&(
                    <button className='singlePostButton' onClick={handleEdit}>Edit</button>
                )}
            </div>
        </div>
    )
}
