import React, {useState} from 'react';

export function TaskItem(props) {
    

    const handleClickDelete = () => {
        props.deleteTask(props.id);
    }

    const [showEdit, setShowEdit] = useState(false);
    const [taskUpdateTitle, setTaskUpdateTitle] = useState('');
    const [taskUpdateDetails, setTaskUpdateDetails] = useState('');
    const handleChangeTitle = (e) => {
        setTaskUpdateTitle(e.target.value);
    };
    const handleChangeDetails = (e) => {
        setTaskUpdateDetails(e.target.value);
    };
    const handleClickUpdate = () => {
        props.updateTask(props.id, taskUpdateTitle, taskUpdateDetails);
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.details}</p>
            <button onClick={handleClickDelete}>Delete</button>
            <button onClick={()=>setShowEdit(showEdit===true ? false : true)}>Edit</button>
            {showEdit && (
            <div>
                <input type="text" placeholder="Title" onChange={handleChangeTitle} />
                <input type="text" placeholder="Details" onChange={handleChangeDetails} />
                <button onClick={handleClickUpdate}>Update</button>
            </div>)}
        </div>
    );
}