import { Component, OnInit } from '@angular/core';
import { Observable, Scheduler, Subject } from 'rxjs';
import { Table } from '../timetable';
import { Sched } from '../sched';
import { ClassesService } from '../classes.service';



@Component({
  selector: 'app-time-tables',
  templateUrl: './time-tables.component.html',
  styleUrls: ['./time-tables.component.css']
})
export class TimeTablesComponent implements OnInit {

  tables$: Observable<Table[]>;
  scheds$: Observable<Sched[]>;

  name:string;
  Tname:string;
  Cname:string;
  Nname:string;
  Dname:string;
  Sname:string;

  constructor(private classService: ClassesService) { }

  ngOnInit(): void {
    this.showSingleTable();
    this.showTables();
  }

  showSingleTable(){
    this.showTable('default table');
  }

  showTables(){
    this.classService.showAllTables().subscribe((result:Observable<Table[]>) =>{
      this.tables$ = result;
    })  
  }

  newTable(Nname){
    if(!Nname){
      console.log('invalid name');
      return;
    }
    this.classService.newTable(Nname).subscribe((result:Observable<Table[]>) =>{
      console.log(result);
      this.tables$ = result;
      this.showTables();
    }) 
  }

  deleteTable(Dname){
    if(!Dname){
      console.log('invalid name');
      return;
    }
    this.classService.deleteTable(Dname).subscribe((result:Observable<Table[]>) =>{
      this.tables$ = result;
    }) 
  }

  deleteAllTables(){
    this.classService.deleteAllTables().subscribe((result:Observable<Table[]>) =>{
      this.tables$ = result;
    }) 
  }

  addCourse(Tname,Cname){
    if(!Tname){
      console.log('invalid timetable');
      return;
    }
    if(!Cname){
      console.log('invalid course');
      return; 
    }
    this.classService.addCourse(Tname,Cname).subscribe((result:Observable<Sched[]>) =>{
      this.scheds$ = result;
    }) 
  }

  showTable(name){
    if(!name){
      console.log('invalid name');
      return;
    }
    this.classService.showTable(name).subscribe((result:Observable<Sched[]>) =>{
      this.scheds$ = result;
    }) 
  }

  //get schedule object and return courses array
  schedCourses(name){
    return name[0];
  }
}
