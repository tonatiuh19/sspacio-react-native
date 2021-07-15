import axios from "axios";

//PROD
//const server = "https://agustirri.com/api/";
//TEST
const server = "http://localhost:8015/api/";

export const getSpacios = async (latitude: string, longitude: string) => {
  try {
    const response = await axios.post(server + "getSpacios.php", {
      latitude: latitude,
      longitude: longitude,
    });
    if (response.data === 0) {
      return 0;
    } else {
      return response.data;
    }
  } catch (e) {
    return `😱 Request failed: ${e}`;
  }
};
