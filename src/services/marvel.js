import { get } from 'axios';
import { getKeys } from './aws';
import crypto from 'crypto';

const createHash = async (privateKey, publicKey) => {
  const data = `${process.env.MARVEL_API_TIMESTAMP}${privateKey}${publicKey}`;

  return crypto.createHash('md5').update(data).digest('hex');
};

const options = {
  baseURL: `${process.env.MARVEL_API_BASE_URL}`,
  headers: {
    accepts: 'application/json',
    'content-type': 'application/json',
  },
  timeout: process.env.TIMEOUT_DEFAULT,
};

const getComics = async () => {
  const { privateKey, publicKey } = await getKeys();
  const hash = await createHash(privateKey, publicKey);

  const url = `${process.env.MARVEL_API_COMICS}?ts=${process.env.MARVEL_API_TIMESTAMP}&apikey=${publicKey}&hash=${hash}`;

  try {
    const {
      data: {
        data: { results },
      },
    } = await get(encodeURI(url), options);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export { getComics };
