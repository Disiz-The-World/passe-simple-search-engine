// src/app/services/balade.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThematicsServices {
  private apiUrl = 'http://localhost:3000/balades';

  constructor(private http: HttpClient) {}

  getBaladesByTag(tagId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?tagIds_like=${tagId}`);
  }
}
