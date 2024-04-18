import React, { useContext, useState } from 'react'
import './ProfileSettings.css'
import Sidebar from '../../components/Sidepar/Sidebar';
import { Context } from '../../components/context/Context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfileSettings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const puplicFile = "http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all required fields are filled in
    if (!username || !email || !password || !file) {
      toast.error('All fields are required! and profile picture');
      return;
    }
  
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
  
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name", filename);
    data.append("file", file);
    updatedUser.profilePic = filename;
  
    try {
      // Upload profile picture
      await axios.post("http://localhost:5000/api/upload", data);
      // Update user information
      const res = await axios.put("http://localhost:5000/api/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      toast.success('Profile updated successfully!');
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      toast.error('Failed to update profile.');
    }
  };
  
  
  return (
    <div className="settings">
    <div className="settingsWrapper">
      <div className="settingsTitle">
        <span className="settingsTitleUpdate">Update Your Account</span>
      </div>
      <form className="settingsForm" onSubmit={handleSubmit}>
        <label>Profile Picture</label>
        <div className="settingsPP">
          <img
            src={file ? URL.createObjectURL(file) : puplicFile + user.profilePic}
            alt=""
          />
          <label htmlFor="fileInput">
            <i className="settingsPPIcon far fa-user-circle"></i>{" "}
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            className="settingsPPInput"
            onChange={(e)=>setFile(e.target.files[0])}
          />
        </div>
        <label>Username</label>
        <input type="text" placeholder={user.username} name="name" onChange={e=>setUsername(e.target.value)}/>
        <label>Email</label>
        <input type="email" placeholder={user.email} name="email" onChange={e=>setEmail(e.target.value)}/>
        <label>Password</label>
        <input type="password" placeholder="Password" name="password" onChange={e=>setPassword(e.target.value)}/>
        <button className="settingsSubmitButton" type="submit">
          Update
        </button>
        <ToastContainer />
      </form>
    </div>
  </div>
);
}
