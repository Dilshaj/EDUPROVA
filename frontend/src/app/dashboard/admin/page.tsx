import InviteUserForm from '@/app/dashboard/admin/components/InviteUserForm';

const AdminPage = () => {
    return (
        <div className="p-8 flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-slate-500">Manage your institution and team invites</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <InviteUserForm />
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-[400px] flex items-center justify-center text-slate-400 font-medium text-center p-6">
                        Administrative Overview & Analytics Dashboard<br />(Coming Soon)
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage