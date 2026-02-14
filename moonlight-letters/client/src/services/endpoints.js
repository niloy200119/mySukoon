import API from './api';

export const getTimeline = () => API.get('/timeline');
export const createTimelineEvent = (data) => API.post('/timeline', data);
export const updateTimelineEvent = (id, data) => API.put(`/timeline/${id}`, data);
export const deleteTimelineEvent = (id) => API.delete(`/timeline/${id}`);

export const getReasons = () => API.get('/reasons');
export const createReason = (data) => API.post('/reasons', data);
export const updateReason = (id, data) => API.put(`/reasons/${id}`, data);
export const deleteReason = (id) => API.delete(`/reasons/${id}`);

export const getLetterInfo = () => API.get('/letter');
export const unlockLetter = (password) => API.post('/letter/unlock', { password });
export const updateLetter = (data) => API.post('/letter', data);

export const getGallery = () => API.get('/gallery');
export const addGalleryImage = (data) => API.post('/gallery', data);
export const deleteGalleryImage = (id) => API.delete(`/gallery/${id}`);

export const adminLogin = (credentials) => API.post('/admin/login', credentials);
