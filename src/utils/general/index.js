// filtering data that are complete and fitting to the application necessity
const comicsSanitize = async (comics) =>
  comics
    .filter(
      (comic) =>
        comic.description !== null &&
        comic.images.length > 0 &&
        comic.characters.items.length > 0 &&
        comic.title !== null &&
        comic.thumbnail !== null
    )
    .map((comicUnwrapped) => {
      // build the image path that will be rendered by client
      const { path, extension } = comicUnwrapped.thumbnail;

      comicUnwrapped.imagePath = `${path}/portrait_fantastic.${extension}`;
      return comicUnwrapped;
    });

const errorHandler = (res, error) => {
  console.error(error);
  if (!error.statusCode) error.statusCode = STATUS_CODE.internalError;
  return res
    .status(error.statusCode)
    .json({ message: 'Internal Server Error' });
};

const responseHandler = ({
  res,
  statusCode,
  isAuth,
  message,
  user,
  favorites,
  comics,
  characters,
  created,
  modified,
  token,
}) => {
  const responseParams = {
    isAuth,
    message,
    user,
    favorites,
    comics,
    characters,
    created,
    modified,
    token,
  };

  return res.status(statusCode).json(responseParams);
};

export { comicsSanitize, errorHandler, responseHandler };
