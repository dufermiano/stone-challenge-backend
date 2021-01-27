'use strict';

import { allComics, comicById } from '../../services/marvel';
import { comicsSanitize } from '../../utils/general';

const getComics = async (req, res) => {
  try {
    const comics = await allComics();
    const sanitizedComics = await comicsSanitize(comics);
    return res.status(200).json({ status: 'ok', sanitizedComics });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'Internal Server Error' });
  }
};

const getComicsById = async (req, res) => {
  try {
    const { comicId } = req.params;

    const comics = await comicById(comicId);
    const sanitizedComic = await comicsSanitize(comics);
    return res.status(200).json({ status: 'ok', sanitizedComic });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'Internal Server Error' });
  }
};

export { getComics, getComicsById };
