import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

import { SearchOptionsComponent } from './search-options/search-options.component';
import { TimeTablesComponent } from './time-tables/time-tables.component';
import { ClassesComponent } from './classes/classes.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    SearchOptionsComponent,
    TimeTablesComponent,
    ClassesComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
