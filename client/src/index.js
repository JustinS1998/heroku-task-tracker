//import { resetWarningCache } from 'prop-types';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

import { TaskItem } from './TaskItem';
import { TaskInsert } from './TaskInsert';

function App (props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/api/tasks_table') // DEMO table
        // fetch('/db/tasks_table') // Deploy table
            .then(res => res.json())
            .then(obj => setTasks([...obj.results]))
            .catch(error => console.error(error));
    }, []);

    const axios = require('axios').default;
    const insertNewTask = (task) => {
        console.log(`Title: ${task.title} Details: ${task.details}`);
    };

    const deleteTask = (id) => {
        //console.log(`Deleting task id: ${id}`);
        axios.delete("/db/tasks_table", {data:{"id":id}})
            .then(res => console.log(res))
            .catch(error => console.error(error));
            // axios.delete("/message", {data:{"message":e.target.textContent}})
            // .then((response) => {
            //     console.log(response);
            //     updateMessages();
            // })
            // .catch((error) => console.error(error));
    }

    return (
        <>
            <h1>Task Tracker</h1>
            <TaskInsert insertNewTask={insertNewTask} />
            {tasks.map((element) => {
                return <TaskItem key={element.id} id={element.id} title={element.title} details={element.details} deleteTask={deleteTask} />
            })}
            {/* <li>
                {tasks.map((element) => {
                    return <ul key={element.id}><strong>{element.title}</strong> {element.details}</ul>
                })}
            </li> */}
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));