//import { resetWarningCache } from 'prop-types';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

import { TaskItem } from './TaskItem';
import { TaskInsert } from './TaskInsert';

function App (props) {
    const [tasks, setTasks] = useState([]);

    const readTasks = () => {
        fetch('/db/tasks_table')
            .then(res => res.json())
            .then(obj => setTasks([...obj.results]))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        readTasks();
    }, []);

    const axios = require('axios').default;
    const insertNewTask = (task) => {
        axios.post("db/tasks_table", {title:task.title, details:task.details})
            .then(res => {
                console.log(res);
                readTasks();
            })
            .catch(error => console.error(error));
    };

    const deleteTask = (id) => {
        axios.delete("/db/tasks_table", {data:{"id":id}})
            .then(res => {
                console.log(res);
                readTasks();
            })
            .catch(error => console.error(error));
    };

    const updateTask = (id, title, details) => {
        axios.put("/db/tasks_table", {"id": id, "title":title, "details":details})
            .then(res => {
                console.log(res);
                readTasks();
            })
            .catch(error => console.error(error));
    };

    return (
        <>
            <h1>Task Tracker</h1>
            <TaskInsert insertNewTask={insertNewTask} />
            {tasks.map((element) => {
                return <TaskItem 
                            key={element.id} 
                            id={element.id} 
                            title={element.title} 
                            details={element.details} 
                            deleteTask={deleteTask}
                            updateTask={updateTask} />
            })}
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));