import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useAsyncError, useParams} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import editStyle from "../CSS/edit.module.css"


const EditContact = () => {
    let userId = useParams()
    const [name, setName] = useState("");
    const[mobile , setMobile] = useState("");
    const[email , setEmail] = useState("");
    const[userimg , setUserImg] = useState("");
    const[about, setAbout]= useState("")
    let navigate = useNavigate();
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/contact/${userId.id}`)
        .then((res)=>{
            setName(res.data.name);
            setMobile(res.data.contact_number)
            setEmail(res.data.email);
            setUserImg(res.data.pic)
            setAbout(res.data.about)
            console.log(res)
            console.log(res.data);
            
        })
        .catch((err)=>{
            console.log("err");
            
        })
    },[])
  
//code to update
let editHandler=(e)=>{
    e.preventDefault();
    let item = {name: name, email:email, contact_number:mobile, pic:userimg, about:about}
    axios.put(`http://localhost:5000/contact/${userId.id}`,item)
    .then((res)=>{
        console.log(res.data);
        navigate("/")
        
    }).catch((err)=>{
        console.log(err);
        
    })
}
  return (
    <div className={editStyle.editContact} >
      <h3><i>Edit Your Information</i></h3>
      <form action="" className={editStyle.editForm}>
        <div className={editStyle['label-input']}>
        <label htmlFor="name">Name: </label>
        <input type="text" placeholder='Name' id="name" value={name} onChange={(e)=>{
          setName(e.target.value)
        }}  />
        <br />
        </div>
        <div className={editStyle['label-input']}>
        <label htmlFor="mobile">Mobile: </label>
        <input type="tel" placeholder='Mobile' id="mobile" value={mobile} 
        onChange={(e)=>{
          setMobile(e.target.value)
        }} />
        <br />
        </div>
        <div className={editStyle['label-input']}>
        <label htmlFor="email">Email: </label>
        <input type="email" placeholder='Email'id="email" value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }} />
        <br />
        </div>
        <div className={editStyle['label-input']}>
        <label htmlFor="userimg">Image: </label>
        <input type="text" placeholder='paste' id="userimg" value={userimg}
        onChange={(e)=>{
          setUserImg(e.target.value)
        }} />
        <br />
        </div>
        <div className={editStyle['label-input']}>
        <label htmlFor="about">About: </label>
        <input type="text" placeholder='about' id="about" value={about}
        onChange={(e)=>{
          setAbout(e.target.value)
        }} />
        <br />
        </div>
        <button onClick={editHandler} className={editStyle.updateBtn}>Update</button>
      </form>
        
    </div>
  )
}

export default EditContact