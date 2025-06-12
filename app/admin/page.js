import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="h-screen overflow-y-auto">
        <AdminDashboard />
      </div>
    </div>
  );
} 