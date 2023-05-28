import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
        const [currentUser, setCurrentUser] = React.useState(null);

        const signIn = async (email, password) => {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                const user = firebase.auth().currentUser;
                setCurrentUser(user);
            } catch (error) {
                console.error(error);
            }
        };

        const signOut = async () => {
            try {
                await firebase.auth().signOut();
                setCurrentUser(null);
            } catch (error) {
                console.error(error);
            }
        };

        const signUp = async (email, password) => {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                const user = firebase.auth().currentUser;
                setCurrentUser(user);
            } catch (error) {
                console.error(error);
            }
        };

        const isNotLogged = () => !firebase.auth().currentUser;

        React.useEffect(() => {
            const unsubscribe = firebase.auth().onAuthStateChanged(user => {
                setCurrentUser(user);
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        }, []);

        return (
            <AuthContext.Provider value={{ currentUser, signIn, signOut, signUp, isNotLogged }}>
    {children}
    </AuthContext.Provider>
);
};