import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../shared/authentication.service";

export const authenticateGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthenticationService)
  const router = inject(Router)
  if(authServ.isAuthenticated()){
    return true
  }

  router.navigate(["/login"])
  return false
};
