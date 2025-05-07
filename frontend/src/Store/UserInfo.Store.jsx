import axios from 'axios';
import { createContext } from 'react';

export const UserStore = createContext({
    handleGetUserData:()=>{}
});

const UserStoreProvider = ({children}) => {
    const urlApi = import.meta.env.VITE_BACKEND_URL;
    const handleGetUserData = async () => {
        const response = await axios.get(`${urlApi}/data/user-profile-data`,{
            withCredentials:true
        });
        const{name,email,age,height,weight,dietaryPreference,diabetes,gender,bloodPressure} = response.data;
        return{name,email,age,height,weight,dietaryPreference,diabetes,gender,bloodPressure};
    }
    return(
        <UserStore.Provider value={{handleGetUserData}}>
            {children}
        </UserStore.Provider>
    )
}
export default UserStoreProvider;