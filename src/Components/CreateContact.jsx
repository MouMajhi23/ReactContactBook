
import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate } from "react-router-dom"
import createStyle from"../CSS/create.module.css"


const CreateContact = () => {
  let navigate = useNavigate()
  const[name , setUserName] = useState("");
  const[mobile , setMobile] = useState("");
  const[email , setEmail] = useState("");
  let[userimg , setUserImg] = useState("");
  const[about, setAbout] = useState("")

  let formHandler = (e)=>{
  
    e.preventDefault();
    if(name.length===0 || mobile.length===0 || email.length===0 || about.length===0){
      alert("please fill all the feild")
      return
    }
    else if(userimg.length ===0)
    {
      userimg = "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1727632701~exp=1727636301~hmac=6a1e6be1c166004446ab9bf09856895f6020f14a201cb55bc71c44748e8ade7e&w=740"
    }
    
    console.log(name);
    console.log(mobile);
    
    let item = {
      name: name,
      contact_number: mobile,
      email:email,
      pic:userimg,
      about:about
    }
    axios.post("http://localhost:5000/contact",item)
    .then((res)=>{
      console.log(res);
      alert("saved")
      navigate('/')
      
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }
  return (
    <div className={createStyle.createContact}>
      <h2>
        Create New Contact</h2>
      <form action="" className={createStyle.myform}>
        <input type="text" id={createStyle.name} placeholder='Name' required value={name} onChange={(e)=>{
          setUserName(e.target.value) 

        }}  />
        <br />
        <input type="tel" id={createStyle.mobile} required placeholder='Mobile' value={mobile} 
        onChange={(e)=>{
          setMobile(e.target.value)
        }} />
        <br />
        <input type="email" id={createStyle.email} required placeholder='Email' value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }} />
        <br />
        <input type="text"  id={createStyle.userimg} placeholder='paste img url' value={userimg}
        onChange={(e)=>{
          setUserImg(e.target.value)
        }} />
        <br />
        <input type="text"  id={createStyle.aboutinfo} required placeholder='About' value={about}
        onChange={(e)=>{
          setAbout(e.target.value)
        }} />
        <br />
        <button onClick={formHandler}>Create</button>
      </form>
        
    </div>
  )
}

export default CreateContact