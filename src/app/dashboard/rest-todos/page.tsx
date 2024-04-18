export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
 title: 'Listado de todos',
 description: 'Listado de todos hecho por REST API',
};

import prisma from "@/app/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export default async function PageTodosPage() {

  const todos = await prisma.todo.findMany({orderBy: {description: 'asc'}})

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo></NewTodo>
      </div>
      <TodosGrid todos={todos}></TodosGrid>
    </div>
  );
}