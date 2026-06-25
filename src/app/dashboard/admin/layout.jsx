import { requiredRole } from "@/app/lib/core/session";


const AdminLayout = async ({ children }) => {
    await requiredRole('admin')
    return children 
};

export default AdminLayout;