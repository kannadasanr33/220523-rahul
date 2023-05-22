import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  apiurl='http://localhost:3000/jobs';

  RegisterJobs(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }
  GetJobsById(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  GetAllJobs(){
    return this.http.get(this.apiurl);
  }
  UpdateJobsById(id:any, inputdata:any){
    return this.http.put(this.apiurl+'/'+id, inputdata);
  }
  DeleteJobsById(id:any){
    return this.http.delete(this.apiurl+'/'+id);
  }
  
}
