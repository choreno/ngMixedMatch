import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatChipsModule,
  MatTableModule,
  MatGridListModule,
  MatDividerModule
} from "@angular/material";

import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [],
  imports: [

    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatGridListModule,
    MatDividerModule,
    FlexLayoutModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatGridListModule,
    MatDividerModule,
    FlexLayoutModule
  ]
})
export class NgMaterialModule {}
