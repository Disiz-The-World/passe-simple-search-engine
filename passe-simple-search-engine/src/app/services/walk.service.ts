import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WalkService {
  private backendBaseUrl = environment.apiUrl;
  private apiUrl = `${this.backendBaseUrl}/balades`;

  constructor(private http: HttpClient) {}

  getWalks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTransformedWalks(): Observable<any[]> {
    return this.getWalks().pipe(
      map((walks) =>
        walks.map((walk) => {
          const imagePath = walk.content?.sections[0]?.content.find(
            (item: any) => item.type === 'image/normal'
          )?.path;

          return {
            image: imagePath
              ? `${this.backendBaseUrl}${imagePath}`
              : 'assets/images/default.jpg',
            title: walk.name,
            description: walk.catchPhrase,
            duration: walk.duration,
            location: walk.location,
            rating: walk.ratings ?? [],
            id: walk.id,
          };
        })
      )
    );
  }

  searchWalks(query: string): Observable<any[]> {
    return this.getWalks().pipe(
      map((walks) =>
        walks.filter(
          (walk) =>
            walk.name?.toLowerCase().includes(query.toLowerCase()) ||
            walk.catchPhrase?.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }
  getWalkById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
