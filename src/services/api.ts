import axios from 'axios';


export const api = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
  headers: {
    authorization: `Apikey ${process.env.CRYPTO_TOKEN}`
  }
})