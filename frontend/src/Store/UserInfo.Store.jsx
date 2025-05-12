import axios from "axios";
import { createContext, useState } from "react";

export const UserStore = createContext({
  handleGetUserData: () => {},
  triggerRefresh: () => {},
  refreshUser:false,
});

const UserStoreProvider = ({ children }) => {
  const urlApi = import.meta.env.VITE_BACKEND_URL;
  const [refreshUser, setRefreshUser] = useState(false);
  const handleGetUserData = async () => {
    const response = await axios.get(`${urlApi}/data/user-profile-data`, {
      withCredentials: true,
    });
    const {
      name,
      email,
      age,
      height,
      weight,
      dietaryPreference,
      diabetes,
      gender,
      bloodPressure,
      imageData,
      barcodes
    } = response.data;
    return {
      name,
      email,
      age,
      height,
      weight,
      dietaryPreference,
      diabetes,
      gender,
      bloodPressure,
      imageData,
      barcodes
    };
  };
//   This toggles the refreshUser state.false ➡ true ➡ false ➡ true
  const triggerRefresh = () => {
    setRefreshUser((prev) => !prev);
  };
  return (
    <UserStore.Provider
      value={{ handleGetUserData, triggerRefresh, refreshUser }}
    >
      {children}
    </UserStore.Provider>
  );
};
export default UserStoreProvider;
