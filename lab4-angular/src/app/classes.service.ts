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

  /** GET classes from the server */
  getClasses(): Observable<Class[]> {
    return of(CLASSES);
  };

  /* GET classes whose name contains search term */
  searchClassesSubj(term: string): Observable<Class[]> {
    if (!term.trim()) {
      // if not search term, return empty classes array.
      return of([]);
    }
    return this.http.get<Class[]>(`${CLASSES}/?subject=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found classes matching "${term}"`) :
        console.log(`no classes matching "${term}"`)),
      catchError(this.handleError<Class[]>('searchClasses', []))
    );
  };
  
  /* GET classes whose name contains search term */
  searchClassesCourse(term: string): Observable<Class[]> {
    if (!term.trim()) {
      // if not search term, return empty classes array.
      return of([]);
    }
    return this.http.get<Class[]>(`${CLASSES}/?className=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found classes matching "${term}"`) :
        console.log(`no classes matching "${term}"`)),
      catchError(this.handleError<Class[]>('searchClasses', []))
    );
  };

  /* GET classes whose name contains search term */
  searchClassesComp(term: string): Observable<Class[]> {
    if (!term.trim()) {
      // if not search term, return empty classes array.
      return of([]);
    }
    return this.http.get<Class[]>(`${CLASSES}/?course_info.ssr_component=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found classes matching "${term}"`) :
        console.log(`no classes matching "${term}"`)),
      catchError(this.handleError<Class[]>('searchClasses', []))
    );
  }
};