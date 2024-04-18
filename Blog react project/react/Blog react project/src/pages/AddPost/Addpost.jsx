import React, { useContext, useState } from 'react';
import './Addpost.css';
import axios from 'axios';
import { Context } from '../../components/context/Context';

export default function Addpost() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;

            try {
                await axios.post("http://localhost:5000/api/upload", data);
            } catch (err) {
                console.error("Error uploading file:", err);
            }
        }

        try {
            const res = await axios.post("http://localhost:5000/api/posts", newPost);
            window.location.replace("/");
        } catch (err) {
            console.error("Error creating post:", err);
        }
    };

    return (
        <div className='addpost'>
            {file && (
                <img className='addImg' src={URL.createObjectURL(file)} alt="" />
            )}
            <form className='writeform' onSubmit={handleSubmit}>
                <div className="writeformgroub">
                    <label htmlFor="fileInput" className="uploadButton">
                        Upload
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                    <input type="text" placeholder='Title' className='writeInput' autoFocus={true} value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='writeformgroub'>
                    <textarea placeholder='Write your post...' className='writeInput writeText' value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <button className="writeSubmite" type='submit'>Add</button>
            </form>
        </div>
    );
}
