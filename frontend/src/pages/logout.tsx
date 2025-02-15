import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader';
import { useAuth } from '../context/AuthContext';

function LogOut() {
   const { setUser } = useAuth();
  const navigate = useNavigate();
    localStorage.removeItem("token");
    setUser(null);
  
  navigate('/');
    return (
        <Loader />
    )
}

export default LogOut;