import React from 'react';

export function TaskItem(props) {
    const handleClick = () => {
        props.deleteTask(props.id);
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.details}</p>
            <button onClick={handleClick}>Delete</button>
        </div>
    );
}