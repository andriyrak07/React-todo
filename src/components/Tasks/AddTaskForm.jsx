import React, {useState} from 'react'
import axios from 'axios'
import addSvg from '../../assets/img/add.svg'


const AddTaskForm = ({list, onAddTask}) => {
    const [visibleForm, setVisivleForn] = useState(false)
    const [inputValue, setInputValue] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const toogleFormVisible = () => {
        setVisivleForn(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        }
        axios
            .post('http://localhost:3001/tasks', obj)
            .then(({ data }) => {
                onAddTask(list.id, data);
                toogleFormVisible();
            })
            .catch(() => {
                alert('Error, try again')
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
    <div className="tasks_form">
        {!visibleForm ? (
            <div onClick={toogleFormVisible} className="tasks_form_new">
            <img src={addSvg} alt="Add icon" srcset="" />
            <span>New task </span>
        </div>) : (<div className="tasks_form_block">
            <input 
                value={inputValue}
                type="text" 
                className="field" 
                placeholder="Text of task"
                onChange={e => setInputValue(e.target.value)}
            />
            <button disabled={isLoading} onClick={addTask} className="button"> {isLoading ? 'Adding...' : 'Add task'}</button>
            <button onClick={toogleFormVisible} className="button button_grey">Отмена</button>
        </div>)}
    </div>
  )
}
export default AddTaskForm;