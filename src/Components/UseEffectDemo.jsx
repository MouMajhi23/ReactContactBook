import React, { useEffect, useState } from 'react'

const useEffectDemo = () => {
    let [data,setData]=useState(0);
    let[num,setNum]=useState(0)
    let increaseHandler = ()=>{
        setData(data+1);
    }
    let decreseHandler = ()=>{
        setNum(num-1);
    }
    
    //1. use Effect with no dependecy 
    // useEffect(()=>{
    //      console.log("hi");
    //  })
     //result : hi will render every time you click on something on the web page , like increase or decrease btn etc.
     //2. use Effect with null dependecy
    //  useEffect(()=>{
    //           console.log("hi");
    //       },[])
    //result: hi will render only one time
    //3. use Effect with dependecy
    useEffect(()=>{
        console.log("hi");
    },[data])
    //result: whatever we will pass here, only clicking on that specific dependency hi will render
    
  return (
    <div>
        <h2>{data}</h2>
        <h2>{num}</h2>
        <button onClick={increaseHandler}>Increase</button>
        <button onClick={decreseHandler}>Decrease</button>
       

    </div>
  )
}

export default useEffectDemo