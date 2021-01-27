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

export { comicsSanitize };
