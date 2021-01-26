'use strict';

import { getAllComics } from '../../services/marvel';

// function that returns the properties
const unwrapComicsProperties = ({
  description,
  characters,
  thumbnail,
  title,
}) => ({
  description,
  characters,
  thumbnail,
  title,
});

const getComics = async (req, res) => {
  try {
    const comics = await getAllComics();
    // filtering data that are complete, fitting to the application necessity
    const filteredComics = comics
      .filter(
        (comic) =>
          comic.description !== null &&
          comic.images.length > 0 &&
          comic.characters.items.length > 0 &&
          comic.title !== null &&
          comic.thumbnail !== null
      )
      .map((comicFiltered) => unwrapComicsProperties(comicFiltered)) // getting only the properties that will be used by the front-end
      .map((comicUnwrapped) => {
        const { path, extension } = comicUnwrapped.thumbnail;

        comicUnwrapped.imagePath = `${path}/portrait_fantastic.${extension}`;
        return comicUnwrapped;
      });
    return res.status(200).json({ status: 'ok', filteredComics });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'Internal Server Error' });
  }
};

export { getComics };
