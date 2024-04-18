import React, { useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("http://localhost:5000/api/categories");
            //   console.log(res)
            setCats(res.data);
        };
        getCats();
    }, []);
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className='sidebarTitle'>ABOUT ME</span>
                <img src="https://images.pexels.com/photos/10172638/pexels-photo-10172638.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quibusdam, asperiores alias voluptates itaque molestiae aspernatur, iste nostrum ratione totam omnis vel quasi,
                    expedita nulla quae eos temporibus iusto perferendis!</p>
            </div>
            <div className="sidebarItem">
                <span className='sidebarTitle'>CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className='link'>
                        <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}



                </ul>
            </div>
            <div className="sidebarItem">
                <span className='sidebarTitle'>FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-linkedin"></i>
                    <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                </div>

            </div>

        </div>
    )
}
