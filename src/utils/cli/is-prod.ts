export const isProd = (): boolean => {
  return !__filename.endsWith("is-prod.js");
};
