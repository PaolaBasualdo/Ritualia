// src/utils/imageUtils.js

const BASE_URL = "http://localhost:3000";

export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";

  if (path.startsWith("http")) return path;

  return `${BASE_URL}/${path}`;
};