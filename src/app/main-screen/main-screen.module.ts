import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './main-screen.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MainScreenComponent],
  imports: [
    CommonModule,
    NgbDropdownModule
  ],
  exports: [
    MainScreenComponent
  ]
})
export class MainScreenModule { }
