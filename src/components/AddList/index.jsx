import React, {useState, useEffect} from "react";
import axios from 'axios';

import List from "../List";
import Badge from '../Badge';

import closeSvg from '../../assets/img/close.svg'

import './AddList.scss';

const AddButtonList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [seletedColor, setselectColor] = useState(3);
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (Array.isArray(colors)) {
            setselectColor(colors[0].id);
        }
    }, [colors])

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        setselectColor(colors[0].id)
    }
    
    const addList = () => {
        if (!inputValue) {
            alert('Error, input name of list')
            return;
        }
        setIsLoading(true);
        axios
            .post('http://localhost:3001/lists', {
                name: inputValue, colorId: seletedColor
            })
            .then(({data}) => {
                const color = colors.filter(c => c.id === seletedColor)[0];
                const listObj = { ...data, color, tasks: [] };
                onAdd(listObj);
                onClose();
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div className="add_list">
            <List 
            onClick={() => setVisiblePopup(!visiblePopup)}
            items = {[
                {
                    className: "list__icon_add",
                    icon: (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    ),
                    name:'Add folder'
                }
                ]}
                />
            {visiblePopup && (<div className="add_list_popup">
                <img 
                    onClick={onClose}
                    src={closeSvg} alt="Close button" className="add_list_popup_close_btn"/>
                <input 
                    value={inputValue} 
                    onChange={e => setInputValue(e.target.value)}
                    type="text" 
                    className="field" 
                    placeholder="Name of folder"
                />

                <div className="add_list_popup_colors">
                    {
                        colors.map(color => (
                        <Badge 
                            onClick= {() => setselectColor(color.id)} 
                            key={color.id} 
                            color={color.name}
                            className = {seletedColor === color.id && 'active'}
                            />
                        ))
                    }
                </div>
                <button onClick={addList} className="button">
                    {isLoading ? 'Adding...' : 'Add list'}
                </button>
            </div>)}
        </div>
    );
};

export default AddButtonList;