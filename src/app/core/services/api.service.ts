import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

// ApiService is the base service for making HTTP requests (GET, POST, PUT, DELETE) to the backend API.
export class ApiService {
  private jsonUrl = environment.apiUrl; // API base URL

  private http: HttpClient = inject(HttpClient); // HttpClient injection

  // Sends a GET request with optional parameters
  get<T>(path: string, params?: HttpParams): Observable<T> {
    const httpparams = params || new HttpParams();
    return this.http.get<T>(`${this.jsonUrl}${path}`, {
      params: httpparams,
    });
  }

  // Sends a POST request with a request body
  post<T>(path: string, body: T): Observable<T> {
    return this.http.post<T>(`${this.jsonUrl}${path}`, body);
  }

  // Sends a PUT request with a request body
  put<T>(path: string, body: T): Observable<T> {
    return this.http.put<T>(`${this.jsonUrl}${path}`, body);
  }

  // Sends a DELETE request
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.jsonUrl}${path}`);
  }
}
