import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  template: ''
})
  // AdminLogoutComponent component class
export class AdminLogoutComponent implements OnInit {
  // Constructor
  constructor(private _Route: Router) {

  }

  // Initialize
  ngOnInit() {
    localStorage.removeItem('AdminUser');
    this._Route.navigate(['Login']);
  }
}
