import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Single from './pages/single/Single';
import Home from './pages/Home/Home';
import Addpost from './pages/AddPost/Addpost';
import ProfileSettings from './pages/ProfileSettings/ProfileSettings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Posts from './components/Posts/Posts';
import Post from './components/Post/Post';
import { useContext } from 'react';
import { Context } from './components/context/Context';

function App() {
  const {user} =useContext(Context)
  return (
    <>
      {/* <Home></Home> */}
      {/* <Single /> */}
      {/* <Addpost /> */}
      {/* <ProfileSettings /> */}
      {/* <Register /> */}
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/add" element={user ? <Addpost /> : <Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post" element={user ? <Single /> : <Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
