import fetch from "node-fetch";

export default async function handler(request, response) {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  return response.status(200).json({ data });
}
