import { useContext, useRef } from 'react'
import { TODO_SERVICE } from '../../services/service';
import { uuid } from '../../utils/uuid';
import { TodoContext } from '../../context/TodoContext';
import { AiOutlineClose } from 'react-icons/ai';
import { createPortal } from 'react-dom';
import axios from 'axios';
import modalStyles from './Modal.module.scss';

export default function Modal() {
  const {setIsShow,getData} = useContext(TodoContext);
  const titleRef = useRef<any>(null);
  const descRef = useRef<any>(null);
  const submitRef = useRef<any>(null);
  const documentElement = document.getElementById("viewTodoModal") as HTMLElement;

  const formValidator = () => {
    if(titleRef.current.value.length < 3 || descRef.current.value.length < 3){
      submitRef.current.disabled = true;
    } else {
      submitRef.current.disabled = false;
    }
  }

  const addTodoItem = (e:any) => {
    e.preventDefault();
    const todoTitle = e.target[0].value;
    const todoDesc = e.target[1].value;
  
    axios.post(TODO_SERVICE,{
      id: uuid(),
      title: todoTitle,
      description: todoDesc
    }).then((response) => {
      getData();
    })
    if(setIsShow !== undefined){
      setIsShow(false)
    }
  }

  const handleClose = () => {
    titleRef.current.value = '';
    descRef.current.value = '';
    //@ts-ignore
    setIsShow(false)
  }
  
  return createPortal (
    <div className={modalStyles.wrapper}>
        <form action="submit" onSubmit={addTodoItem} >
        <AiOutlineClose className={modalStyles.closeIcon} onClick={handleClose}/>
            <div>Title:</div>
            <input type="text" ref={titleRef} onChange={formValidator}/>
            <div>Description:</div>
            <textarea name="" id="" onChange={formValidator} ref={descRef}></textarea>
            <input type="submit" value="" ref={submitRef} disabled/>
        </form>
        <div className={modalStyles.overlay}></div>
    </div>,
    documentElement
  )
}
