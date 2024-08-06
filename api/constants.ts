export const API_URL =
  process.env.NODE_ENV === "production"
    ? `https://myvet-api.vercel.app/api`
    : `http://localhost:8001/api`;
export const API_URL_IMAGE =
  process.env.NODE_ENV === "production"
    ? `https://myvet-api.vercel.app`
    : `http://localhost:8001`;
