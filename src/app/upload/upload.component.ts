import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule]
})
export class UploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      dropdown: [''],
      textInput: [''],
      freeText: [''],
      file: new FormControl(null, Validators.required)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('dropdown', this.uploadForm.get('dropdown')?.value);
    formData.append('textInput', this.uploadForm.get('textInput')?.value);
    formData.append('freeText', this.uploadForm.get('freeText')?.value);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    if (this.uploadForm.valid) {
      this.http.post('https://localhost:7122/Upload', formData).subscribe(
        (response) => console.log('Success!', response),
        (error) => console.error('Error!', error)
      );
    }
  }
}
