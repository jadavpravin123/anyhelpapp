import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerinqueryComponent } from './buyerinquery/buyerinquery.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BuyerinqueryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    
  ]
})
export class BuyermoduleModule { }
