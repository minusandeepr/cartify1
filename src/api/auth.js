// src/api/auth.js
import API from './axios';

export async function register(data) {
  const res = await API.post('/auth/register', data);
  return res.data;
}


export async function login(data) {
  const res = await API.post('/auth/login', data);
  return res.data;
}
