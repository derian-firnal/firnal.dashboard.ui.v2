import IAxiosService from "./IAxiosService";

export const loginUser = async (email, password) => {
  try {
    const response = await IAxiosService.post(`auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (newUser) => {
  try {
    console.log("new user", newUser);
    const response = await IAxiosService.post(`auth/register`, newUser);
    return response.data;
  } catch (error) {
    console.error("Failed to create new user:", error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('loggedInUser');
};
