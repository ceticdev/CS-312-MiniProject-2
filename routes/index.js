// import express and axios
import { Router } from 'express';
import axios from 'axios';
const router = Router();

// api key
const apiKey = 'b2846f9d-fe95-4be0-8251-fc729756e3d7';

// homepage route
router.get('/', (req, res) => {
    res.render('index', { price: null, crypto: null, currency: null, error: null });
});

// price route
router.post('/get-price', async (req, res) => {
  // convert to uppercase for the API
  // get symbol from form
  const crypto = req.body.crypto.toUpperCase();
  // get conversion currency
  const currency = req.body.currency.toUpperCase();

  // blockchain API endpoint
  const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}&convert=${currency}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      }
    });

  // check if valid data
  if (response.data && response.data.data[crypto] && response.data.data[crypto].quote[currency]) {
    // get price
    const price = response.data.data[crypto].quote[currency].price.toFixed(3);
    res.render('index', { price, error: null, crypto, currency });
  } else {
    // invalid input
    res.render('index', { price: null, error: 'Invalid symbol.', crypto, currency });
  }
  } catch (error) {
    // API error
    res.render('index', { price: null, error: 'Error retrieving price.', crypto, currency });
  }
});

// export the router as default
export default router;
