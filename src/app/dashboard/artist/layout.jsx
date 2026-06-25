import { requiredRole } from '@/app/lib/core/session';


const ArtistLayout = async ({ children }) => {
    await requiredRole('artist')
    return children 
};

export default ArtistLayout;