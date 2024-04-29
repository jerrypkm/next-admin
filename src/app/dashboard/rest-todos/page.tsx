import prisma from "@/app/lib/prisma";
import { getSessionServer } from "@/auth/actions/auth-actions";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
 title: 'Listado de todos',
 description: 'Listado de todos hecho por REST API',
};


export default async function PageTodosPage() {

  const user = await getSessionServer();
  if(!user) redirect('/api/auth/signin');
 
  const todos = await prisma.todo.findMany({
    where:{ userId: user.id },
    orderBy: {description: 'asc'}
  })
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo></NewTodo>
      </div>
      <TodosGrid todos={todos}></TodosGrid>
    </div>
  );
}