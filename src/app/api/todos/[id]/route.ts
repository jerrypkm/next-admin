import prisma from '@/app/lib/prisma'
import { getSessionServer } from '@/auth/actions/auth-actions'
import { Todo } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

interface Segments {
  params: {
    id: string
  }
}

const getTodo = async (id: string):Promise<Todo | null> => {
  const user = await getSessionServer();
  if(!user) {
    return null
  }
  const todo = await prisma.todo.findFirst({where: {
    id: id
  }})

  if(todo?.userId !== user.id){
    return null
  }

  return todo
}

export async function GET(request: NextRequest, {params}: Segments) { 

  const todo = await getTodo(params.id);

  if (!todo){
    return NextResponse.json({message: `Todo with id ${params.id} not found`}, {status: 404})
  }

  return NextResponse.json(todo)
}


const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional()
})

export async function PUT(request: NextRequest, {params}: Segments) { 
  
  const todo = await getTodo(params.id);

  if (!todo){
    return NextResponse.json({message: `Todo with id ${params.id} not found`}, {status: 404})
  }

  try{
    const { complete, description } = await putSchema.validate(await request.json()) 

    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { complete, description }
    })
    return NextResponse.json(updatedTodo)
  }
  catch(err){
    return NextResponse.json(err, {status: 400})
  }


}