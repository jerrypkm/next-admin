import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data:{
            email: 'test1@google.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin', 'client', 'super-user'],
            name: 'test1',
            todos:{
                create: [
                    { description:  'Gema del alma', complete: true },
                    { description:  'Gema del poder', complete: false },
                    { description:  'Gema del tiempo', complete: false },
                    { description:  'Gema del espacio', complete: false },
                    { description:  'Gema de la realidad', complete: false }
                ]
            }
        }
    })

    // await prisma.todo.createMany({
    //     data: [
    //         { description:  'Gema del alma', complete: true },
    //         { description:  'Gema del poder', complete: false },
    //         { description:  'Gema del tiempo', complete: false },
    //         { description:  'Gema del espacio', complete: false },
    //         { description:  'Gema de la realidad', complete: false }
    //     ]
    // })

    // const todo = await prisma.todo.create({
    //     data: {description: 'Piedra del alma', complete: true},
    // })

    // console.log(todo)

  return NextResponse.json({message: 'Seed Excecuted'})
}