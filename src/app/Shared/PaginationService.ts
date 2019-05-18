import { PaginationModel } from './PaginationModel';
import { PageEvent } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  // PaginationService service class
export class PaginationService {
  // Field Properties
  private paginationModel: PaginationModel;
  // Getter Properties
  get page(): number { return this.paginationModel.pageIndex; }
  get selectItemsPerPage(): number[] { return this.paginationModel.selectItemsPerPage; }
  get pageCount(): number { return this.paginationModel.pageSize; }

  // Constructor
  constructor() {
    this.paginationModel = new PaginationModel();
  }

  // Function Methods - change function
  change(pageEvent: PageEvent) {
    this.paginationModel.pageIndex = pageEvent.pageIndex + 1;
    this.paginationModel.pageSize = pageEvent.pageSize;
    this.paginationModel.allItemsLength = pageEvent.length;
  }
}
