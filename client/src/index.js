//import { resetWarningCache } from 'prop-types';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

function App (props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        console.log('useeffect');
        fetch('/api/tasks')
            .then(res => res.json())
            .then(tasksObj => setTasks([...tasksObj.tasks]))
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <h1>Task Tracker</h1>
            <li>
                {tasks.map((element) => {
                    return <ul key={element.id}><strong>{element.title}</strong> {element.details}</ul>
                })}
            </li>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));