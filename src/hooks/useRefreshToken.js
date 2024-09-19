import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.roles,  // ensure roles is updated
                accessToken: response.data.accessToken,  // new access token
                username: response.data.username,  // ensure username is maintained
                email: response.data.email  // maintain email state
            };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;