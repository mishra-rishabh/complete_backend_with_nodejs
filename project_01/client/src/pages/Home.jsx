import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [todos, setTodos] = useState([]);
    // const [completed, setCompleted] = useState(false);

    const addTodoHandler = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/todo/create", { title, description }, { headers: { "Content-Type": "application/json" }, withCredentials: true });

            console.log(res);

            if (res.data.success) {
                alert(res.data.message);

                setTodos([...todos, res.data.todo]);
                setTitle("");
                setdescription("");
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchAllTodos = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/todo/allTodo");

                if (res.data.success) {
                    setTodos(res.data.allTodos);
                    console.log(todos);
                }
            } catch (error) {
                alert(error.response.data.message);
                // console.log(error.response.data.message);
            }
        };

        fetchAllTodos();
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center justify-center mb-5">
                <Navbar />
                <div className="flex items-center gap-5 mt-5 mb-5 w-1/4">
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Add a new todo..." />
                    <Button onClick={addTodoHandler}>Add Todo</Button>
                </div>
                <Textarea value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Write a description..." className="w-1/4" />

                
            </div>
            <div className='grid gap-2 grid-cols-3 p-10'>
                    {
                        todos.map((todo) => (
                            <Card key={todo._id}>
                                <CardHeader>
                                    <CardTitle>{todo.title}</CardTitle>
                                    <CardDescription>{todo.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))
                    }
                </div>
        </div>
    )
}

export default Home