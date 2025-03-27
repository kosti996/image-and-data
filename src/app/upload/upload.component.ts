import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog) {
    this.uploadForm = this.fb.group({
      dropdown: new FormControl('', Validators.required),
      textInput: new FormControl('', Validators.required),
      freeText: new FormControl('', Validators.required),
      file: new FormControl(null)
    });
  }

  openDialog(message: { title: string, description: string }): void {
    this.dialog.open(MyDialogComponent, {
      width: '400px',
      data: { message }
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
        () => this.openDialog({ title: 'Success', description: 'Data are saved!' }),
        () => this.openDialog({ title: 'Error', description: 'Please attach image' })
      );
    }
  }

  onReset() {
    this.uploadForm.reset();
    this.uploadForm.get('file')?.reset();
  }
}
