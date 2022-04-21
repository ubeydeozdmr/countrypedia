import { API_ROUTE } from './config';

export const getData = async function (keyword) {
  try {
    const res = await fetch(API_ROUTE + keyword);
    if (!res.ok) return;
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
