import { useState } from 'react';
import { Input  } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';


function AddTodoForm({ addTodo, users }) {
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({
            title,
            user_id: userId,
            completed: false
        });
        setTitle('');
        setUserId('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input 
                placeholder="Todo Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <Select 
                placeholder="Assign User" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
                required
            >
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </Select>
            <Button type="submit">Add Todo</Button>
        </form>
    );
}

export default AddTodoForm;