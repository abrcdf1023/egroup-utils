export const findDeepValue = (obj, path) => {
  const arrayPath = path.split('.');
  for (let i = 0; i < arrayPath.length; i++) {
    obj = obj[arrayPath[i]];
  }
  return obj;
};
