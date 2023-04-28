import React, { useContext, useState } from 'react'
import {AiOutlineDoubleRight} from 'react-icons/ai'
import { todoTypes } from '../../dto/todo';
import { TodoContext } from '../../context/TodoContext';
import ViewTaskModal from '../popUp/ViewTaskModal';
import styles from './TodoForm.module.scss';

export default function TodoForm() {
  const {setIsShow,todos} = useContext(TodoContext);
  const [isViewed,setIsViewed] = useState(false);
  
  const [selectedTask,setSelectedTask] = useState<React.SetStateAction<todoTypes>>({
    id:'',
    title:'',
    description:''
  });

  const addTodo = () => {
    if(setIsShow !== undefined){
      setIsShow(true)
    }
  }
  
  const props = {
    selectedTask,
    setIsViewed
  }
  const viewTask = (id:string) => {
    if(setSelectedTask !== undefined && Array.isArray(todos)){
      setSelectedTask(todos.filter((item:todoTypes) => item.id === id)[0] || []);
    }
    setIsViewed(true);
  }

  return (
    <div className={styles.todoFormWrapper}>
      <header>
        <h1>My Todos</h1>
      </header>
      
      <ul className={styles.todoItems}>
        {
          todos?.map((item:todoTypes) => (
            <li key={item.id + item.title} className={styles.items} onClick={() => viewTask(item.id)} >
              <h2>{item.title}</h2>
              <AiOutlineDoubleRight className={styles.moreDetails} />
            </li>
          ))
        }
        {
          todos?.length === 0 ? <div className={styles.noData}>Click the add button to add your todos</div> : null
        }
      </ul>
      <span className={styles.icons} onClick={addTodo}></span>
      {
        isViewed ? <ViewTaskModal item={selectedTask} setIsViewed={setIsViewed}/> : null
      }
    </div>
  )
}
