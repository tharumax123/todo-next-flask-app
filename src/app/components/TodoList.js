import { Button } from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import { Table } from '@/components/ui/table';
import {Card} from '@/components/ui/card';




function TodoList({ todos, toggleComplete, deleteTodo }) {
    return (
        <Card>
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>
                                <Checkbox 
                                    checked={todo.completed} 
                                    onChange={() => toggleComplete(todo.id)}
                                />
                            </td>
                            <td>
                                <Button onClick={() => toggleComplete(todo.id)}>
                                    {todo.completed ? 'Unmark' : 'Mark'} Complete
                                </Button>
                                <Button variant="destructive" onClick={() => deleteTodo(todo.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    );
}

export default TodoList;