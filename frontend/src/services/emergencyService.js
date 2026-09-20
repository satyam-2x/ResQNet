import API from "../api";

export const createReport = (data) => API.post("/submit-report", data);

export const getIncidents = () => API.get("/incidents");

export const updateStatus = (data) => API.put("/update-status", data);