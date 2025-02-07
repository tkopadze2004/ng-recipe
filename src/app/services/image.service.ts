import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  // Define the API URL for ImgBB upload endpoint
  private apiUrl = `https://api.imgbb.com/1/upload?key=${environment.imgbbApiKey}`;

  private http: HttpClient = inject(HttpClient); // HttpClient injection

  //Method to  Upload an image file to ImgBB API.
  uploadImage(file: File): Observable<Data> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(this.apiUrl, formData);
  }
}
