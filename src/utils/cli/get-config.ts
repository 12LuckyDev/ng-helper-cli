import fs from 'fs';
import path from 'path';
import { Config } from '../../models';
import { isProd } from './is-prod';

export const getConfig = (): Config | null => {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, isProd() ? '../' : '../../../', 'package.json'), {
        encoding: 'utf8',
      }),
    );
  } catch (ex) {
    console.error(ex);
    return null;
  }
};
