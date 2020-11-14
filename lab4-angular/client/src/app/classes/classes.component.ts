import { Component, OnInit } from '@angular/core';
import { Class } from '../class';
import { ClassesService } from '../classes.service';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes: Class[];
  constructor(private classesService: ClassesService) { }

  ngOnInit(): void {
  }


}
