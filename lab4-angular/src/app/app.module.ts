import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchOptionsComponent } from './search-options/search-options.component';
import { TimeTablesComponent } from './time-tables/time-tables.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchOptionsComponent,
    TimeTablesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
