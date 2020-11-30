import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class ClassesService {

  rootUrl = '/api';  // URL to web api
/*
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  */

  constructor( private http: HttpClient ) { }


  //////////////////////////////////////classes////////////////////////////////////
  /* GET classes from the server */
  getClasses(){
    return this.http.get(this.rootUrl + '/class');
  };

  /* GET classes by subject */
  searchClassesSubj(subj){
    return this.http.get(this.rootUrl+ '/class/' + subj);
  };

  /* GET classes by subject, and  code */
  searchClassesCod(subj,code) {
    return this.http.get(this.rootUrl+ '/class/' + subj +'/'+ code)
  };

  /* GET classes by subject, code, and component */
  searchClassesComp(subj,code,comp) {
    return this.http.get(this.rootUrl+ '/class/' + subj +'/'+ code +'/'+ comp)
  };


  ////////////////////////////////////tables////////////////////////////////////
  //create new table
  newTable(name){
    return this.http.post(this.rootUrl + '/table/' + name, null);
  };

  //delete table
  deleteTable(name){
    return this.http.delete(this.rootUrl + '/table/killTable/'+name, {headers:{'Content-Type':'application/json'}});
  };

  //delete all tables
  deleteAllTables(){
    return this.http.delete(this.rootUrl + '/table/killallTables', {headers:{'Content-Type':'application/json'}});
  };

  //addcourse to table
  addCourse(Tname,Cname){
    return this.http.post(this.rootUrl + '/table/'+Tname+'/'+Cname, null);
  };

  //show table
  showTable(name){
    return this.http.get(this.rootUrl + '/table/tables/'+name);
  };

  showAllTables(){
    return this.http.get(this.rootUrl + '/table/tables');

  };

};