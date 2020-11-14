import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Class } from '../class';
import { ClassesService } from '../classes.service';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.css']
})
export class SearchOptionsComponent implements OnInit {
  classes$: Observable<Class[]>;
  private searchTerms = new Subject<string>();

  subj:string;
  comp:string;
  cod:string;

  constructor(private classService: ClassesService) {}

  // Push a search term into the observable stream.
  destroy$: Subject<boolean> = new Subject<boolean>();


  ngOnInit(): void {
    this.showAll();
  }

  showAll() {
    this.classService.getClasses().subscribe((result:Observable<Class[]>) =>{
      this.classes$ = result;
      console.log('result is ', this.classes$);

    })  
  }

  searchSubj(subj){
    this.classService.searchClassesSubj(subj).subscribe(result =>{
      console.log('result is ', result);
      this.classes$ = result[''];
    })  
  }

  searchSubjCodeComp(subj, code, comp){
    this.classService.searchClassesComp(subj,code,comp).subscribe(result =>{
      console.log('result is ', result);
      this.classes$ = result['data'];
    })  
  }
}