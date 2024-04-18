
import { Todo } from '@prisma/client'
import styles from './TodoItem.module.css'
import React from 'react'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({todo, toggleTodo}:Props) => {
  return (
    <div className={todo.complete ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <div className={`
          flex p-2 rounded-md cursor-pointe
          hover:bg-opacity-60
          ${ todo.complete ? "bg-blue-100" : "bg-red-100"}
        `}
          onClick={() => toggleTodo(todo.id, !todo.complete)}
        >
          {
            todo.complete 
              ? <IoCheckboxOutline size={30}></IoCheckboxOutline> 
              : <IoSquareOutline size={30}></IoSquareOutline>
          }
        </div>
        <div className='text-center sm:text-left'>
          {todo.description}
        </div>
      </div>
    </div>
  )
}
