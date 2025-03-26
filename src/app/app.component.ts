import { Component } from '@angular/core';
import { UploadComponent } from "./upload/upload.component";

@Component({
  selector: 'app-root',
  imports: [UploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'image-and-data';
}
