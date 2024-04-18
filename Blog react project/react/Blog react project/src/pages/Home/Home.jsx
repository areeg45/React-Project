import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Posts from '../../components/Posts/Posts'
import './Home.css'
import Sidebar from '../../components/Sidepar/Sidebar'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts"+search);
      // console.log(res)
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
    <Header></Header>
   
    <div className='home'>
      <Posts posts={posts}></Posts>
      {/* <Sidebar></Sidebar> */}
    </div>
    </>
  )
}
