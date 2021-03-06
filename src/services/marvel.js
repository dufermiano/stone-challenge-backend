import { get } from 'axios';
import { getKeys } from './aws';
import crypto from 'crypto';

const options = {
  baseURL: `${process.env.MARVEL_API_BASE_URL}`,
  headers: {
    accepts: 'application/json',
    'content-type': 'application/json',
  },
  timeout: process.env.TIMEOUT_DEFAULT,
};

const createHash = async (privateKey, publicKey) => {
  const data = `${process.env.MARVEL_API_TIMESTAMP}${privateKey}${publicKey}`;

  return crypto.createHash('md5').update(data).digest('hex');
};

const allComics = async () => {
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

const comicById = async (comicId) => {
  const { privateKey, publicKey } = await getKeys();
  const hash = await createHash(privateKey, publicKey);

  const url = `${process.env.MARVEL_API_COMICS}/${comicId}?ts=${process.env.MARVEL_API_TIMESTAMP}&apikey=${publicKey}&hash=${hash}`;

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

const allCharacters = async () => {
  const { privateKey, publicKey } = await getKeys();
  const hash = await createHash(privateKey, publicKey);

  const url = `${process.env.MARVEL_API_CHARACTERS}?ts=${process.env.MARVEL_API_TIMESTAMP}&apikey=${publicKey}&hash=${hash}`;

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

const characterById = async (characterId) => {
  const { privateKey, publicKey } = await getKeys();
  const hash = await createHash(privateKey, publicKey);

  const url = `${process.env.MARVEL_API_CHARACTERS}/${characterId}?ts=${process.env.MARVEL_API_TIMESTAMP}&apikey=${publicKey}&hash=${hash}`;

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

export { allComics, comicById, allCharacters, characterById };
