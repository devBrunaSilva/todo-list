import React, { createContext, useEffect, useState } from "react";

export interface Task {
  title: string;
  done: boolean;
  id: number;
}

interface TasksContextData {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export const TasksContext = createContext({} as TasksContextData)

interface TasksProviderProps {
  children: React.ReactNode
}

export const TasksProvider: React.FC<TasksProviderProps> = ({children}) => {
  
  const [tasks, setTasks] = useState([] as Task[])

  useEffect(() => {
    const tasksOnLocalStorage = localStorage.getItem("tasks")

    if(tasksOnLocalStorage) {
      setTasks(JSON.parse(tasksOnLocalStorage))
    }
  }, [])
  
  return(
    <TasksContext.Provider value={{
      tasks,
      setTasks
    }}>
      {children}
    </TasksContext.Provider>
  )
}