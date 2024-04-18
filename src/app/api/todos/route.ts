import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { boolean, object, string } from 'yup'

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams
  const take = Number(searchParams.get('take') ?? '10')
  const skip = Number(searchParams.get('skip') ?? '0')

  if( isNaN(take) ) 
    return NextResponse.json({
      message: 'take must be a number'
    }, {status: 400})

  if( isNaN(skip) ) 
    return NextResponse.json({
      message: 'skip must be a number'
    }, {status: 400})

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip
  })

  return NextResponse.json(todos)
}


const postSchema = object({
  description: string().required(),
  complete: boolean().optional().default(false)
})

export async function POST(request: Request) { 
  try{

    const {complete, description} = await postSchema.validate( await request.json() );

    const todo = await prisma.todo.create({data: {
      complete, 
      description
    }})

    return NextResponse.json(todo)

  }
  catch(err){
    return NextResponse.json(err, {status: 400})
  }
}


export async function DELETE(request: NextRequest) {

  try{
    const deleted = await prisma.todo.deleteMany({
      where: {
        complete: true
      }
    })
    return NextResponse.json({message: `Deleted ${deleted.count} TODO(S) completed`})
  }
  catch(err){
    return NextResponse.json(err, {status: 400})
  }
}