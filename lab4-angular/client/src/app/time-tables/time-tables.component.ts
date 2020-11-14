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
  Nname:string;
  Dname:string;
  Sname:string;

  constructor(private classService: ClassesService) { }

  ngOnInit(): void {
    this.showTables();
  }

  showTables(){
    this.classService.showAllTables().subscribe((result:Observable<Table[]>) =>{
      this.tables$ = result;
    })  
  }

  newTable(Nname){
    this.classService.newTable(Nname).subscribe((result:Observable<Table[]>) =>{
      console.log(result);
      this.tables$ = result;
      this.showTables();
    }) 
  }

  deleteTable(Dname){
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
