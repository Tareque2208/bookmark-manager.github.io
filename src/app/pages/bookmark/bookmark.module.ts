import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookmarkRoutingModule } from './bookmark-routing.module';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { BookmarkManagerComponent } from './bookmark-manager/bookmark-manager.component';



@NgModule({
  imports: [BookmarkRoutingModule,
    CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgZorroAntdModule],
  declarations: [BookmarkManagerComponent],
  exports: [BookmarkManagerComponent]
})
export class BookmarkModule { }
