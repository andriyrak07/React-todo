import React from 'react'
import editSvg from '../../assets/img/edit.svg'
import axios from 'axios'
import AddTaskForm from './AddTaskForm'


import './tasks.scss'
const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Name of list:', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Sorry, error')
            })
        }
    }

  return (
    <div className="tasks">
        <h2 style={{color: list.color.hex}} className="tasks_title">
            {list.name}
            <img src={editSvg} onClick={() => editTitle()} alt="Edit icon" />
        </h2>
        
        <div className="tasks_items">
            {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачі відсутні</h2>}
            {list.tasks && list.tasks.map(task => (
                    <div key={task.id} className="tasks_items_row">
                    <div className="checkbox">
                        <input id={`task-${task.id}`} type="checkbox" />
                        <label htmlFor={`task-${task.id}`}>
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </label>
                    </div>
                    <input readOnly value={task.text}/>
                </div>
            ))}
            <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
        </div>
    </div>

  )
}

export default Tasks;