import { useEffect, useState} from 'react'
import { TODO_SERVICE } from './services/service'
import { TodoContext } from './context/TodoContext'
import TodoForm from './components/todo/TodoForm'
import Modal from './components/modal/Modal'
import axios from 'axios'
import './App.scss'

function App() {
  const [todos,setTodos] = useState([]);
  const [isShow,setIsShow] = useState(false);
  const [isLoading,setIsLoading] = useState(true)
  const props = {
    isShow,
    setIsShow,
    todos,
    getData,
  }

  async function getData() {
    try{
      const res = await axios.get(TODO_SERVICE);
      setTodos(res.data);
      setIsLoading(false)
    } catch(error){
      console.log(error)
    }
  }
  
  useEffect(() => {
    getData();
  }, [])
  
  if(isLoading){
    return <h1>...Loading</h1>
  }
  return (
    <div className="App">
      <TodoContext.Provider value={props}>
      <TodoForm/>
        { isShow ? <Modal/> : null }
      </TodoContext.Provider>
    </div>
  )
}

export default App
