'use server'

import { revalidatePath } from "next/cache"
import { Todo } from "@prisma/client"
import prisma from "@/app/lib/prisma"
import { boolean, object, string } from "yup"

export const sleep = async (secons: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, secons * 1000 )
  })
}

export const toggleTodo = async ( id: string, complete: boolean ): Promise<Todo> => {
  
  await sleep(3);
  
  const todo = await prisma.todo.findFirst({
    where: {id: id}
  })

  if(!todo){
    throw `Todo con id ${id} no encontrado`
  }

  const updatedTodo = await prisma.todo.update({
    where: { id: id},
    data: { complete: complete }
  })

  revalidatePath('/dashboard/server-todos')

  return updatedTodo
}


const postSchema = object({
  description: string().required(),
  complete: boolean().optional().default(false)
})

export const createTodo = async (description: string) => { 
  try{

    const todo = await prisma.todo.create({data: { description }})
    revalidatePath('/dashboard/server-todos')

    return todo

  }
  catch(err){
    return {
      message: `Error: ${err}` 
    }
  }
}

export const deleteCompleted = async (): Promise<void> => {
  try{
    await prisma.todo.deleteMany({
      where: {
        complete: true
      }
    })
    revalidatePath('/dashboard/server-todos')
  }
  catch(err){
    throw `Error al intentar borrar todos completados: ${err}`
  }
}