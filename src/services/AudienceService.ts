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
  }
};

export default audienceService;
