import React, {useState} from 'react';

export function TaskInsert(props) {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const onChangeDetails = (e) => {
        setDetails(e.target.value);
    };
    const handleClick = () => {
        props.insertNewTask({title:title, details:details});
    }

    return (
        <div>
            <h2>Insert Task</h2>
            <input type="text" placeholder="Title" value={title} onChange={onChangeTitle} />
            <input type="text" placeholder="Details" value={details} onChange={onChangeDetails} />
            <button onClick={handleClick}>Insert</button>
        </div>
    );
}