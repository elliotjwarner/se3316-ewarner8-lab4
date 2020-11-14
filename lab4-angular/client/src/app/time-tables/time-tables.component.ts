import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Table } from '../timetable';
import { ClassesService } from '../classes.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-time-tables',
  templateUrl: './time-tables.component.html',
  styleUrls: ['./time-tables.component.css']
})
export class TimeTablesComponent implements OnInit {

  tables$: Observable<Table[]>;

  name:string;
  Tname:string;
  Cname:string;

  constructor(private classService: ClassesService) { }

  ngOnInit(): void {
    this.showTables();
  }

  showTables(){
    this.classService.showAllTables().subscribe((result:Observable<Table[]>) =>{
      this.tables$ = result;
    })  
  }

  newTable(name){
    this.classService.newTable(name).subscribe((result:Observable<Table[]>) =>{
      this.tables$ = result;
    }) 
  }

  deleteTable(name){
    this.classService.deleteTable(name).subscribe((result:Observable<Table[]>) =>{
      this.tables$ = result;
    }) 
  }

  deleteAllTables(){
    this.classService.deleteAllTables().subscribe((result:Observable<Table[]>) =>{
      this.tables$ = result;
    }) 
  }

  addCourse(Tname,Cname){
    this.classService.addCourse(Tname,Cname).subscribe((result:Observable<Table[]>) =>{
      this.tables$ = result;
    }) 
  }

  showTable(name){
    this.classService.showTable(name).subscribe((result:Observable<Table[]>) =>{
      this.tables$ = result;
    }) 
  }
}
