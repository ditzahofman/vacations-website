import { useEffect, useState } from 'react';
import UserModel from "../Models/User-model";
import { authStore } from '../Redux/AuthState';

// Custom Hook/

const useUser = (): UserModel => {
 
  const [user, setUser] = useState<UserModel>()
  
   
  useEffect(() => {
      setUser(authStore.getState().user)
      const unsubscribe = authStore.subscribe(() => {
          setUser(authStore.getState().user);
          console.log(user)
      });

      return () => unsubscribe();
  }, [])

  return user;
};

export default useUser;