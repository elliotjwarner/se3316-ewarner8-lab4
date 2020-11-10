import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Class } from './class';


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

  /** GET heroes from the server */
  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.classesUrl)
      .pipe(
        tap(_ => console.log('fetched classes')),
        catchError(this.handleError<Class[]>('getClasses', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getClass(id: number): Observable<Class> {
    const url = `${this.classesUrl}/${id}`;
    return this.http.get<Class>(url).pipe(
      tap(_ => console.log(`fetched class id=${id}`)),
      catchError(this.handleError<Class>(`getClass id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchClasses(term: string): Observable<Class[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Class[]>(`${this.classesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found classes matching "${term}"`) :
        console.log(`no classes matching "${term}"`)),
      catchError(this.handleError<Class[]>('searchClasses', []))
    );
  }

}