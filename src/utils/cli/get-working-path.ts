import path from 'path';

export const getWorkingPath = (argPath?: string | null): string => {
  return argPath ? (path.isAbsolute(argPath) ? argPath : path.join(process.cwd(), argPath)) : process.cwd();
};
