import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class UserAuthGuardService implements CanActivate {

  // Constructor
  constructor(private router: Router) { }

  // canActivate function
  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // Current User logged in, so return true
      return true;
    }

    // Current User not logged in, so redirect to login page
    this.router.navigate(['/Login']);
    return false;
  }
}
