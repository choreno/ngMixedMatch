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
  MatDividerModule,
  MatBadgeModule,
  MatSnackBarModule
} from "@angular/material";



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
    MatBadgeModule,
    MatSnackBarModule
    
    
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
    MatBadgeModule,
    MatSnackBarModule
    
  ]
})
export class NgMaterialModule {}
