import { CanActivateFn } from '@angular/router';

export const verifyLoginGuard: CanActivateFn = (route, state) => {
  return true;
};
