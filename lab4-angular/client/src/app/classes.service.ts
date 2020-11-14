import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class ClassesService {

  rootUrl = 'http://localhost:8080/api';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient ) { }

  /* GET classes from the server */
  getClasses(){
    return this.http.get(this.rootUrl + '/class');
  };

  /* GET classes by subject */
  searchClassesSubj(subj){
    return this.http.get(this.rootUrl+ '/class/' + subj);
  };

  /* GET classes by subject, code, and component */
  searchClassesComp(subj,code,comp) {
    return this.http.get(this.rootUrl+ '/class/' + subj + code + comp)
  };

};