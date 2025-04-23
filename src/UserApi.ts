

import axios from "axios";

export interface Use {
  id: number;
  name: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3001/',
})

export const getUsers =() => api.get('/users').then(res => res.data)

export const getUser = (id: number | string) => api.get(`/users/${id}`).then(res => res.data)

export const uodateUser =({id, ...updatedUser}: {id: number | string}) => api.put(`/users/${id}`, updatedUser).then(res => res.data)