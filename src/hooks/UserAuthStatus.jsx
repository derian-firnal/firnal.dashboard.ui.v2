import { useEffect, useState } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth'

const UserAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);  // Reversed back to default false
  const [checkStatus, setCheckStatus] = useState(true);

  useEffect(() => {
    console.log('[AuthStatus] Checking for jwtToken in localStorage...');
    const token = localStorage.getItem('jwtToken');

    if (token) {
      console.log('[AuthStatus] jwtToken found, setting loggedIn = true');
      setLoggedIn(true);
    } else {
      console.log('[AuthStatus] No jwtToken found, setting loggedIn = false');
      setLoggedIn(false);
    }

    setCheckStatus(false);
    console.log('[AuthStatus] checkStatus = false');
  }, []);

  return { loggedIn, checkStatus };
};

export default UserAuthStatus;
