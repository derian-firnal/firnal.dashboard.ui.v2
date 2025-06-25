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

  downloadAudienceCsv: async (uploadId: string, audienceName: string) => {
    const response = await IAxiosService.get(`audience/DownloadAudience/${uploadId}`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${audienceName}.csv`; // ✅ Use name from table
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  downloadSampleCsv: async () => {
    const response = await IAxiosService.get(`audience/GetSampleCsv`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sample_upload.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

};

export default audienceService;
