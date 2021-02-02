'use strict';

import {
  allComics,
  comicById,
  allCharacters,
  characterById,
} from '../../services/marvel';
import {
  comicsSanitize,
  errorHandler,
  responseHandler,
} from '../../utils/general';
import { STATUS_CODE, defaultMessages } from '../../utils/general/constantes';

const getComics = async (req, res) => {
  try {
    const comics = await allComics();
    const sanitizedComics = await comicsSanitize(comics);
    return responseHandler({
      res,
      statusCode: STATUS_CODE.success,
      isAuth: true,
      comics: sanitizedComics,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

const getComicsById = async (req, res) => {
  try {
    const { comicId } = req.params;

    const comics = await comicById(comicId);
    const sanitizedComic = await comicsSanitize(comics);
    return responseHandler({
      res,
      statusCode: STATUS_CODE.success,
      isAuth: true,
      comics: sanitizedComic,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

const getCharacters = async (req, res) => {
  try {
    const characters = await allCharacters();
    return responseHandler({
      res,
      statusCode: STATUS_CODE.success,
      isAuth: true,
      characters,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

const getCharactersById = async (req, res) => {
  try {
    const { characterId } = req.params;

    const characters = await characterById(characterId);
    return responseHandler({
      res,
      statusCode: STATUS_CODE.success,
      isAuth: true,
      characters,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export { getComics, getComicsById, getCharacters, getCharactersById };
