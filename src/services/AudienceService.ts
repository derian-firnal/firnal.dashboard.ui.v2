import IAxiosService from "./IAxiosService";

const audienceService = {
  uploadAudienceFiles: async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    const response = await IAxiosService.post("audience/uploadAudience", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  getAudienceUploadDetails: async () => {
    const response = await IAxiosService.get("audience/getAudienceUploadDetails");
    return response.data;
  },

  getUploadedFilecount: async () => {
    const response = await IAxiosService.get("audience/getUploadedFileCount");
    return response.data;
  },

  getUniqueRecordsCount: async () => {
    const response = await IAxiosService.get("audience/getUniqueRecordsCount");
    return response.data;
  },

  getAudiences: async () => {
    const response = await IAxiosService.get("audience/getAudiences");
    return response.data;
  },

  getAverageIncome: async (uploadId: number) => {
    const response = await IAxiosService.get(`audience/getAverageIncomeForUpload/${uploadId}`);
    return response.data;
  },

  getGenderVariance: async (uploadId: number) => {
    const response = await IAxiosService.get(`/audience/getGenderVariance/${uploadId}`);
    return response.data;
  },

  getAgeDistribution: async (uploadId: number) => {
    const response = await IAxiosService.get(`/audience/getAgeDistribution/${uploadId}`);
    return response.data;
  },

  getAudienceConcentration: async (uploadId: number) => {
    const response = await IAxiosService.get(`/audience/getAudienceConcentration/${uploadId}`);
    return response.data;
  },

  getIncomeDistribution: async (uploadId: number) => {
    const response = await IAxiosService.get(`/audience/getIncomeDistribution/${uploadId}`);
    return response.data;
  },

  getSampleData: async (uploadId: number) => {
    const response = await IAxiosService.get(`/audience/getSampleData/${uploadId}`);
    return response.data;
  },

  enrichAudience: async (uploadId: number) => {
    const response = await IAxiosService.post(`/audience/EnrichAudience/${uploadId}`);
    return response.data;
  },

};

export default audienceService;
