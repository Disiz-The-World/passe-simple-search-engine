import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalkService {
  private apiUrl = 'http://localhost:3000/balades';
  private backendBaseUrl = 'http://localhost:3000';

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
            rating:
              walk.ratings.reduce((a: number, b: number) => a + b, 0) /
                walk.ratings.length || 0,
            id: walk.id,
          };
        })
      )
    );
  }

  getWalkById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
