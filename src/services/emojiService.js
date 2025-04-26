import axios from "axios";

const BASE_URL = "http://localhost:5000/api/emojis";

export async function fetchEmojis() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении эмодзи:", error);
    return [];
  }
}
