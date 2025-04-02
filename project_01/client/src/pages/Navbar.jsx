import { Button } from '@/components/ui/button'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout");

      if(res.data.success) {
        alert(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  };
  return (
    <div>
      <div className='flex items-center justify-between p-2 gap-5 mt-15'>
        <h1>{"My Fullstack Todo App"}</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  )
}

export default Navbar