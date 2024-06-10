import { environment } from '../../environments/environment';

export const Logger = {
  log: (...args: any) => {
    if (!environment.production) {
      console.log(args);
    }
  },
  error: (...args: any) => {
    if (!environment.production) {
      console.error(args);
    }
  },
};
