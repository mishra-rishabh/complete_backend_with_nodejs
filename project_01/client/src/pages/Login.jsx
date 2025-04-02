import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };
  const loginHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/login", user, {headers: {"Content-Type": "application/json"}, withCredentials: true});

      console.log(res);

      if(res.data.success) {
        alert(res.data.message);
        navigate("/")
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-svh'>
      <Input value={user.email} name="email" onChange={changeHandler} type="text" placeholder="email"/>
      <Input value={user.password} name="password" onChange={changeHandler} type="password" placeholder="password"/>
      <Button onClick={loginHandler}>Login</Button>
    </div>
  )
}

export default Login