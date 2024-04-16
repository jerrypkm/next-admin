import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany()

    await prisma.todo.createMany({
        data: [
            { description:  'Gema del alma', complete: true },
            { description:  'Gema del poder', complete: false },
            { description:  'Gema del tiempo', complete: false },
            { description:  'Gema del espacio', complete: false },
            { description:  'Gema de la realidad', complete: false }
        ]
    })

    // const todo = await prisma.todo.create({
    //     data: {description: 'Piedra del alma', complete: true},
    // })

    // console.log(todo)

  return NextResponse.json({message: 'Seed Excecuted'})
}