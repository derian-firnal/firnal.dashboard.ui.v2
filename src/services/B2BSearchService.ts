import IAxiosService from "./IAxiosService";

export const getSolomonSearchResults = async (filters) => {
  try {
    const response = await IAxiosService.post(`/ConsumerGraph`, filters);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch consumer graph results:", error);
    throw error;
  }
};
