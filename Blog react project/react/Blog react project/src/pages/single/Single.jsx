import React from 'react'
import './Single.css'
import Sidebar from '../../components/Sidepar/Sidebar'
import SinglePost from '../../components/SinglePost/SinglePost'

export default function Single() {
  return (
    <div className='single'>
      {/* post */}
      <SinglePost></SinglePost>
      {/* <Sidebar></Sidebar> */}
    </div>
  )
}
