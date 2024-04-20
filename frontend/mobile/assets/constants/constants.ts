
const ip_v4 = {
  phuong: '192.168.1.8',
}

const API_PORT = '7500'

// Phuong: This is the api web for DongNaiAppTravel
// export const API_ROOT = 'https://dong-nai-travel-api.onrender.com'
let useLocalServer = false;
export const API_ROOT = useLocalServer ? `http://${ip_v4.phuong}:${API_PORT}/v1/` : 'https://masterbranchcalendar.onrender.com/v1';

