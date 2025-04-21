import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
export const MATERIAL_IMPORTS = [
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule, // If you need buttons
  MatInputModule,  // If you need inputs
  MatChipsModule,  // If you use chips
  MatFormFieldModule, // If you use form fields
  MatSelectModule, // If you use selects
];