import { requiredRole } from '@/app/lib/core/session';


const UserLayout = async ({ children }) => {
    await requiredRole('user')
    return children 
};

export default UserLayout;