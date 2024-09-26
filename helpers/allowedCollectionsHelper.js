const allowedCollectionsHelper = (collectionName = "", collections = []) => {
  const collectionIncluded = collections.includes(collectionName);

  if (!collectionIncluded) {
    throw new Error(
      `The collection ${collectionName} is not allowed in ${collections}`
    );
  }
  return true;
};

module.exports = {
  allowedCollectionsHelper,
};
