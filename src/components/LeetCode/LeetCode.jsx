import { useState, useEffect } from "react"
import React from 'react'
import {useParams} from 'react-router-dom'

function LeetCode() {

    const {username} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
          fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            setData(data)
        })
        } catch (error) {
          console.error("Error fetching LeetCode data:", error);
        }
    }, [])

  return (

    <div className="p-6">
      <h1 className="text-xl font-bold">LeetCode Profile: {username}</h1>
      <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
        Github Followers : {data.followers}
        <img src = {data.avatar_url} alt='Github picture' width={300}/>
        </div>
    </div>
  )
}

export default LeetCode