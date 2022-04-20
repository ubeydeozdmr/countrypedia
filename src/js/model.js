export const getData = async function (keyword) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/${keyword}`);
    if (!res.ok) return;
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
