import React, { useContext } from "react"

import styles from './styles.module.scss'
import { StatsCard } from "../StatsCard/StatsCard"
import { TasksContext } from "../../Context/TasksContext"

export const Header: React.FC = () => {
  const {tasks} = useContext(TasksContext)

  const totalTasks = tasks.length;
  const totalPending = tasks.reduce((total, task) => {
    if(!task.done){
      return total + 1;
    }else {
      return total
    }
  }, 0)
  
  const totalDone = totalTasks - totalPending

 
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div>
            <h1>MyTodo</h1>

            <span>Bem-vindo, Bruna !</span>
          </div>


          <div>
            <StatsCard 
              title="Total de Tarefas"
              value={totalTasks}
            />  
            <StatsCard
              title="Tarefas Pendentes"
              value={totalPending}
            />  
            <StatsCard
               title="Tarefas Concluídas"
               value={totalDone}
            />  
          </div>
        </div>
      </header>
    </>
  )
}