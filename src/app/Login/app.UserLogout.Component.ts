import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template: ''
})

  // UserLogoutComponent component class
export class UserLogoutComponent implements OnInit {
  // Constructor
  constructor(private _Route: Router) {

  }

  // Initialize
  ngOnInit() {
    localStorage.removeItem('currentUser');
    this._Route.navigate(['Login']);
  }
}
