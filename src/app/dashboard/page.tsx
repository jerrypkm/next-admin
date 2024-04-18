import { WidgetItem } from "@/components";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      
      <WidgetItem 
        title="Global Activities" 
        content="$23,988" 
        description="Compared to last week $13,988"
        helper="2%"  
      />

    </div> 
  );
}