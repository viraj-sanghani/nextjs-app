import { cache } from "react";
import axios from "axios";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API });
const getPropertyInfo = (id) =>
  fetch(process.env.NEXT_PUBLIC_API + "/property/info/" + id);

export const getDetail = async (id) => {
  const res = await getPropertyInfo(id);
  const data = await res.json();
  return data;
};

export const revalidate = 30;

const page = async () => {
  /* const response = await fetch("http://localhost:5000/v1/property/home");
  const data = await response.json(); */

  const data = await getDetail(2380);

  return <div>{JSON.stringify(data)}</div>;
};

export default page;
