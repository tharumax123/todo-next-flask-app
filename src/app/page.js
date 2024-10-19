'use client'

import { useState, useEffect } from 'react';
import AddTodoForm from '../app/components/AddToForm';
import TodoList from '../app/components/TodoList';
import { Card } from '@/components/ui/card';

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([{
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',

    },{
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com',
    }]);
    // test

    useEffect(() => {
        async function fetchData() {
            const todoRes = await fetch('http://127.0.0.1:8000/todos');
            const todos = await todoRes.json();
            setTodos(todos);

            const userRes = await fetch('/api/users');
            const users = await userRes.json();
            setUsers(users);
        }

        fetchData();
    }, []);

    const addTodo = async (newTodo) => {
        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        });
        const todo = await res.json();
        setTodos([...todos, todo]);
    };

    const toggleComplete = async (id) => {
        const todo = todos.find((t) => t.id === id);
        const updatedTodo = { ...todo, completed: !todo.completed };

        const res = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        });

        setTodos(
            todos.map((t) => (t.id === id ? updatedTodo : t))
        );
    };

    const deleteTodo = async (id) => {
        await fetch(`/api/todos/${id}`, { method: 'DELETE' });
        setTodos(todos.filter((t) => t.id !== id));
    };

    return (
        <div>
            <h1>Todo App</h1>
            <Card>
                <AddTodoForm addTodo={addTodo} users={users} />
            </Card>
            <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        </div>
    );
}




// 'use client'

// import Image from "next/image";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"
// import { useState } from "react";
// import axios from "axios";

// export default function Home() {
//   const [title, setTitle] = useState("")
//   const [selectedUser, setSelectedUser] = useState('')

//   const handleSubmit = async (e) => { 
//     e.preventDefault();
//     console.log({title, selectedUser})
    
//     // Uncomment the following code when you're ready to make the API call
//     // await axios.post(url, {title, selectedUser})
//     // .then(
//     //   (response) => {
//     //     console.log(response);
//     //   },
//     //   (error) => {
//     //     console.log(error);
//     //   }
//     // )
//   }

//   return (
//     <div className="p-4">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid w-full max-w-sm items-center gap-1.5">
//           <Label htmlFor="title">Title</Label>
//           <Input 
//             type="text" 
//             id="title" 
//             placeholder="Add a title" 
//             value={title} 
//             onChange={(e) => setTitle(e.target.value)} 
//           />
//         </div>
//         <div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="w-52">
//                 {selectedUser ? selectedUser.charAt(0).toUpperCase() + selectedUser.slice(1) : 'Select User Type'}
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56">
//               <DropdownMenuLabel>Select User Type</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuRadioGroup value={selectedUser} onValueChange={setSelectedUser}>
//                 <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
//                 <DropdownMenuRadioItem value="staff">Staff</DropdownMenuRadioItem>
//                 <DropdownMenuRadioItem value="trainee">Trainee</DropdownMenuRadioItem>
//               </DropdownMenuRadioGroup>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <div>
//           <Button type="submit">Submit</Button>
//         </div>
//       </form>
//     </div>
//   );
// }