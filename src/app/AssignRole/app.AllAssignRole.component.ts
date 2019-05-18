import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from '@angular/material';
import { AssignandRemoveRoleService } from './Services/app.AssignandRemoveRole.Service';
import { AssignRolesViewModel } from './Models/AssignRolesViewModel';

@Component({
  templateUrl: './app.AllAssignedRoles.html',
  styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
    '../Content/vendor/metisMenu/metisMenu.min.css',
    '../Content/dist/css/sb-admin-2.css',
    '../Content/vendor/font-awesome/css/font-awesome.min.css'
  ]
})

// AllAssignRoleComponent component class
export class AllAssignRoleComponent implements OnInit {
  // Field Properties
  private _assignservice;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['RoleName', 'UserName'];
  dataSource: any;
  AssignModel: AssignRolesViewModel[]
  errorMessage: any;
  offset: any;

  // Constructor
  constructor(private _Route: Router, assignservice: AssignandRemoveRoleService) {
    this._assignservice = assignservice;
  }

  // Initialize
  ngOnInit(): void {
    this._assignservice.GetAllAssignedRoles().subscribe(
      assignModel => {

        this.dataSource = new MatTableDataSource(assignModel);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => this.errorMessage = <any>error
    );
  }

  // Function Methods - applyFilter function
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Function Methods - getNext function
  getNext(event: PageEvent) {
    this.offset = event.pageSize * event.pageIndex
    // call your api function here with the offset
    console.log(event.pageSize);
    console.log(event.pageIndex);
  }
}
