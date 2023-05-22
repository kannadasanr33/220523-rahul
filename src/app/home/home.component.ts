import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HomeService } from '../service/home.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  isList = true;
  userRole: any;
  constructor(
    private builder: FormBuilder, 
    private service: HomeService, 
    private dialog: MatDialog,
    private _router: Router,
    private toastr: ToastrService,
    private _route: ActivatedRoute
  ) {
    this.LoadUser();
    this.userRole = sessionStorage.getItem('role');
    console.log(this.userRole, 'this.userRole');
  }
  list: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

  }
  LoadUser() {
    this.service.GetAllJobs().subscribe(res => {
      this.list = res;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['job_number', 'job_title', 'job_start_date', 'job_notes', 'number_of_openings', 'action'];

  adduser() {
    this.isList = false;
    console.log('New');
    this._router.navigate([`new`]);
  }
  updateuser(id: any) {
    this.isList = false;
    console.log(id);
    this._router.navigate([`${id}`]);
  }
  // viewuser(id: any) {
  //   console.log(id);
  //   this._router.navigate([`view/${id}`]);
  // }
  removeuser(id: any) {
    console.log(id);
  }
  
}
