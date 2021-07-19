import React, {useState} from 'react';

export function TaskItem(props) {
    const [showEdit, setShowEdit] = useState(false);

    const handleClick = () => {
        props.deleteTask(props.id);
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.details}</p>
            <button onClick={handleClick}>Delete</button>
            <button onClick={()=>setShowEdit(showEdit===true ? false : true)}>Edit</button>
            {showEdit && (
            <div>
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Details" />
            </div>)}
        </div>
    );
}