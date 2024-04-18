'use client'
import { startTransition, useOptimistic } from 'react'
import { Todo } from '@prisma/client'
import styles from './TodoItem.module.css'
import React from 'react'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({todo, toggleTodo}:Props) => {

  const [ todoOptimistic, toggleTodoOptimistic ] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({...state, complete: newCompleteValue})
  );

  const onToggleTodo = async () => {
    try{
      startTransition( () => toggleTodoOptimistic( !todoOptimistic.complete ))
      await toggleTodo (todoOptimistic.id, !todoOptimistic.complete);
    }catch(err){
      startTransition( () => toggleTodoOptimistic( !todoOptimistic.complete ))
    }
  }

  return (
    <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <div className={`
          flex p-2 rounded-md cursor-pointe
          hover:bg-opacity-60
          ${ todoOptimistic.complete ? "bg-blue-100" : "bg-red-100"}
        `}
          // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
          onClick={onToggleTodo}
        >
          {
            todoOptimistic.complete 
              ? <IoCheckboxOutline size={30}></IoCheckboxOutline> 
              : <IoSquareOutline size={30}></IoSquareOutline>
          }
        </div>
        <div className='text-center sm:text-left'>
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  )
}
