import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import * as auth from '../services/auth';

interface User{
    email: string;
    password: string;
}

interface AuthContextData{
    signed: boolean;
    user: User | null;
    signIn(email: string, username:string): Promise<void>;
    signOut(): void;
    handleToggleRemember(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        async function loadStorageData(){
            const storagedUser = await localStorage.getItem('@proffy:user');
            const storagedToken = await localStorage.getItem('@proffy:token');

            if(storagedUser && storagedToken){
                setUser(JSON.parse(storagedUser));
            }
        }

        loadStorageData();
    }, []);

   
    async function signIn(username: string, email: string){
        const response = await auth.signIn(username, email);

        console.log(response);

        setUser(response.user);

        if(remember){
            localStorage.setItem('@proffy:user', JSON.stringify(response.user));
            localStorage.setItem('@proffy:token', response.token);
        }
    };
    
    function handleToggleRemember(){
        setRemember(!remember)
    };

    function signOut(){
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut, handleToggleRemember}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}