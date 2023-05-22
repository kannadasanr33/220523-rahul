import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../service/home.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  rolelist: any;
  editdata: any;
  itemId: any;
  item: any;
  registerform: FormGroup;
  isEdit= false;
  constructor(private builder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private service: HomeService,
    ) {
      // this.service.getuserrole().subscribe(res => {
      //   this.rolelist = res;
      // });
      this.itemId = this.route.snapshot.paramMap.get('id');
      console.log(this.itemId, 'this.itemId');
      this.registerform = this.builder.group({
        job_number: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(2)])),
        job_title: this.builder.control('', Validators.required),
        job_start_date: this.builder.control('', Validators.compose([Validators.required])),
        job_close_date: this.builder.control('', Validators.compose([Validators.required])),
        number_of_openings: this.builder.control('user'),
        experience_required: this.builder.control(true),
        job_notes: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(2)]))
      });
  }

  ngOnInit(): void {
    if (this.itemId != '' && this.itemId != null) {
      this.service.GetJobsById(this.itemId).subscribe( res => {
        this.item = res;
        console.log(this.item);
        this.loaduserdata(this.item);        
        this.isEdit = true;
      });
    }
  }
  
  loaduserdata(data: any) {   
    this.registerform.setValue({
        job_number: data.job_number,
        job_title: data.job_title,
        job_start_date: data.job_start_date,
        job_close_date: data.job_close_date,
        number_of_openings: data.number_of_openings,
        experience_required: data.experience_required,
        job_notes: data.job_notes,
    });
  }
  proceedregister() {
    if (this.registerform.valid) {
      if(this.isEdit) {
        this.service.UpdateJobsById(this.itemId, this.registerform.value).subscribe(result => {
          this.toastr.success('','Updated successfully')
          this.router.navigate(['/'])
        },
        err =>{
        console.log(err);
          this.toastr.error(err,'');
        });
      } else {
        this.service.RegisterJobs(this.registerform.value).subscribe(result => {
          this.toastr.success('','Registered successfully')
          this.router.navigate(['/'])
        },
        err =>{
        console.log(err);
          this.toastr.error(err,'');
        });
      }    
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
