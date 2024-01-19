import React, { FormEvent, useContext, useState } from "react";

import fechar from '../../assets/images/cancel.png'
import styles from './styles.module.scss'
import { TasksContext } from "../../Context/TasksContext";

export const Tasks: React.FC = () => {

  const [taskTitle, setTaskTitle] = useState("");

  const {tasks, setTasks} = useContext(TasksContext)

  
  function handleSubmitAddTask(event: FormEvent){
    event.preventDefault()
   
    if(taskTitle.length < 3) {
      alert('Não é possível adicionar uma tarefa com menos de 3 letras')
      return;
    }

    const newTasks = [
      ...tasks,
      {id: new Date().getTime(), title:taskTitle, done: false}
    ]

    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(newTasks))

    setTaskTitle("")
  }

  function handleToggleTasksStatus(taskId: number) {
    const newTasks = tasks.map((task) => {
      if(taskId === task.id) {
        return {
          ...task,
          done: !task.done
        }
      }
      return task
    })
    setTasks(newTasks)
  }

  //utilizar o filter para remover a tarefa do arry de tarefas
  function handleRemoveTask(taskId:number) {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(newTasks))
  }

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmitAddTask}>
        <div>
          <label htmlFor="task-title">Adicionar Tarefa</label>
          <input 
            type="text" 
            id="task-title" 
            placeholder="Título da Tarefa" 
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
          />
        </div>

        <button 
          type="submit"
        >
          Adicionar Tarefa
        </button>
      </form>

      
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <input 
                type="checkbox" 
                id={`task-${task.id}`}
                onChange={() => handleToggleTasksStatus(task.id)}
              />
              <label 
                htmlFor={`task-${task.id}`}
                className={task.done ? styles.done: ""}
              >
                {task.title}
              </label>
              <button
                className={styles.fechar}
                onClick={() => handleRemoveTask(task.id)}
              ><img src={fechar} alt="" /></button>
            </li>
          )
        })} 
      </ul>
     
    </section>
  )
}