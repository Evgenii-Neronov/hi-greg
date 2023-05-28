import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Me = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const fetchUserData = async () => {
          
          try {
                    var accessToken = localStorage.getItem('access_token');
                    const response = await axios.get('/api/auth/me', {
                    headers: { Authorization: `Bearer ${accessToken}` }
            });

        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
            <p>{userData.forename} {userData.surname}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Me;
