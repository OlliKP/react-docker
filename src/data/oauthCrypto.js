// oauthCrypto.js

// Import necessary functions from oauth-1.0a and crypto-js
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

// Define your consumer key and secret
const consumerKey = 'ck_0949511189625c7c3a26c8acf32bab174aa80fdb';
const consumerSecret = 'cs_6aaa4fb9d76a463af02b1009dda1e6ef5f6a1f78';

// Create OAuth instance with consumer key and secret
const oauth = OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
  }
});

// Function to generate OAuth signature using CryptoJS
const generateOAuthSignature = (base_string, key) => {
  return oauth.getSignature({ key: consumerKey, secret: consumerSecret }, base_string);
};

// Export OAuth and generateOAuthSignature functions
export { OAuth, generateOAuthSignature };
