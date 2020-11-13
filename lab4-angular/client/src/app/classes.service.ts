import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Class } from './class';
import { CLASSES } from './mock-classes';



@Injectable({ providedIn: 'root' })
export class ClassService {

  private classesUrl = 'api/classes';  // URL to web api

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient ) { }

  /* GET classes from the server */
  getClasses(){
    return this.http.get('/api/class');
  };

  /* GET classes by subject */
  searchClassesSubj(subj){
    return this.http.get('/api/'+subj);
  };
  
  /* GET classes by subject and course code */
  searchClassesCourse(subj, code){
    return this.http.get('/api/'+subj+code)
  };

  /* GET classes by subject, code, and component */
  searchClassesComp(subj,code,comp) {
    return this.http.get('/api/'+subj+code+comp)
  };

};