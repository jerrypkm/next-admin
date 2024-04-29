import { auth } from '@/auth';
import { Sidebar, TopMenu } from '@/components';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  if(!session) {
    redirect('/api/auth/signin')
  }

  return (
    <>
      <Sidebar></Sidebar>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu/>
        <div className="px-6 bg-white pt-6 pb-6 p-2 m-2 rounded">
          {children}
        </div>
      </div>
    </>
  );
}