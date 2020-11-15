import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Class } from '../class';
import { ClassesService } from '../classes.service';


@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.css']
})
export class SearchOptionsComponent implements OnInit {
  classes$: Observable<Class[]>;

  subj:string;
  comp:string;
  cod:string;

  constructor(private classService: ClassesService) {}

  ngOnInit(): void {
    this.showAll();
  }

  showAll() {
    this.classService.getClasses().subscribe((result:Observable<Class[]>) =>{
      this.classes$ = result;
    })  
  }

  searchSubj(subj){
    if(!subj){
      console.log('invalid input');
      return;
    }
    this.classService.searchClassesSubj(subj).subscribe((result:Observable<Class[]>) =>{
      this.classes$ = result;
    })  
  }

  searchSubjCodeComp(subj, code, comp){
    if(!subj){
      console.log('invalid input');
      return;
    }
    else if(!code){
      console.log('invalid input');
      return;
    }

    else if(!comp){
      this.classService.searchClassesCod(subj,code).subscribe((result:Observable<Class[]>) =>{
        this.classes$ = result;
        return;
      })  
    }else{
      this.classService.searchClassesComp(subj,code,comp).subscribe((result:Observable<Class[]>) =>{
        this.classes$ = result;
      })  
    }
    
    
  }
}