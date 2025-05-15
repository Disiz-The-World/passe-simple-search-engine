import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ThematicsServices {
  private apiUrl = `${environment.apiUrl}/balades`;

  constructor(private http: HttpClient) {}

  getBaladesByTag(tagId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?tagIds_like=${tagId}`);
  }
}
