import CryptoJS from 'crypto-js';

const encrypt = (string) => CryptoJS.SHA256(string).toString();

export { encrypt };
