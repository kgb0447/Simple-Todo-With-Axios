import { useContext, useRef, useState } from 'react'
import { createPortal  } from 'react-dom';
import { todoTypes } from '../../dto/todo';
import { TodoContext } from '../../context/TodoContext';
import { TODO_SERVICE } from '../../services/service';
import cs from 'classnames'
import CloseBtn from '../closebtn/CloseBtn';
import axios from 'axios';
import popupStyles from './ViewTaskModal.module.scss';


export default function ViewTaskModal({item,setIsViewed}:any) {
    const [isChangable,setIsChangable] = useState(false);
    const todoTitleRef = useRef<any>(null);
    const todoDetailsRef = useRef<any>(null);
    const {todos,getData} = useContext(TodoContext);
    const documentElement = document.getElementById("viewTodoModal") as HTMLElement;
  
    const isChangble = () => {
      todoTitleRef.current.contentEditable = true;
      todoDetailsRef.current.contentEditable = true;
      todoTitleRef.current.focus();
      setIsChangable(true);
    }
    
    const setChangedTask = async () => {
      setIsChangable(false);
      todoTitleRef.current.contentEditable = false;
      todoDetailsRef.current.contentEditable = false;
      const url = TODO_SERVICE.concat("/",item.id);

        try{
          axios.put(url,{
             title: todoTitleRef.current.innerText,
             description: todoDetailsRef.current.innerText
           })
         }catch(error){
           console.log(error)
         }finally{
           getData();
         }
    }

    const deleteTask = async (item:string) => {
      if(Array.isArray(todos)) {
        const selected = todos?.filter((val:todoTypes) => val.id === item)[0];
        const url = TODO_SERVICE.concat("/",selected?.id || '');
        try{
          const res = axios.delete(url);
        } catch(error) {
          console.log(error)
        } finally {
          getData();
        }
      }
      setIsViewed(false);
    }
    
    const handleClose = () => {
      setIsViewed(false);
      getData();
    }
  return createPortal(
    <div className={popupStyles.overlay}>
      <div className={popupStyles.wrapper}>
          <header>
            <CloseBtn callback={handleClose} right={0} top={10}/>
            <p>Task Details:</p>
          </header>
          <section>
            <div className={popupStyles.todoTitle} ref={todoTitleRef}>{item.description}</div>
            <p className={popupStyles.todoDetails} ref={todoDetailsRef}>{item.description}</p>
          </section>
          <div className={popupStyles.modalBtnWrapper}>
            {
             !isChangable ? <div className={cs(popupStyles.icons,popupStyles.editIcon)} onClick={isChangble} /> : 
             <div className={cs(popupStyles.icons,popupStyles.saveChangesIcon)} onClick={setChangedTask} />
            }
            
            <div className={cs(popupStyles.icons,popupStyles.deleteIcon)} onClick={() => deleteTask(item.id)} />
          </div>
      </div>
    </div>,
    documentElement
  )
}
