import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../Redux/AuthState';

// Custom Hook

function useVerifyLoggedIn() {

  const navigate = useNavigate();

  useEffect(() => {

    // If we don't heave a token
    if (!authStore.getState().token) {
      navigate('/home');
    }

  }, []);

};

export default useVerifyLoggedIn;