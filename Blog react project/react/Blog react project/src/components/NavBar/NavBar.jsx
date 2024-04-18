import React, { useContext } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';


export default function NavBar() {
    const { user, dispatch } = useContext(Context);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };
    const puplicFile = "http://localhost:5000/images/"

    return (
        <div className='nav'>
            <div className='navLeft'>
                <i className="navIcon fa-brands fa-square-facebook"></i>
                <i className="navIcon fa-brands fa-linkedin"></i>
                <i className="navIcon fa-brands fa-square-twitter"></i>
                <i className="navIcon fa-brands fa-square-instagram"></i>
            </div>
            <div className='navCenter'>
                <ul className='topList'>
                    <li className='topListItem' style={{ textDecoration: "none", color: "inherit" }}>
                        <Link className="link" to="/">Home</Link>
                    </li>

                    <li className='topListItem' onClick={handleLogout}>{user && "Logout"}</li>
                </ul>
            </div>
            <div className='navRight'>
                {
                    user ? (
                        <React.Fragment>
                            <Link to="/profile" className='link'>
                                <img className='navImg' src={puplicFile + user.profilePic} alt="" />
                            </Link>
                            <span style={{ marginLeft: '8px', fontSize: "20px" }}>{user.username}</span>
                        </React.Fragment>
                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/login">
                                    LOGIN
                                </Link>
                            </li>
                            <li className="topListItem">
                                <Link className="link" to="/register">
                                    REGISTER
                                </Link>
                            </li>
                        </ul>
                    )}
                <Link to="/add" className="link">
                    <i className="add fa-solid fa-plus"></i>
                </Link>
            </div>
        </div>
    )
}
