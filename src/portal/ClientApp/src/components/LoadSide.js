import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const AuthCheckComponent = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Имитация асинхронной операции проверки учетных данных
        const simulateAsync = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Очищение таймера при размонтировании компонента
        return () => clearTimeout(simulateAsync);
    }, []);

    if (loading) {
        
        return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
        </div>
);
} else {
    
    return (
        <div>
        </div>
);
}
};

export default AuthCheckComponent;