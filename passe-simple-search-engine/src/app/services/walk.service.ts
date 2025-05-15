import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaladeModel, RawBalade } from '../models/balade.model';

@Injectable({
  providedIn: 'root',
})
export class WalkService {
  backendBaseUrl = environment.apiUrl;
  private apiUrl = `${this.backendBaseUrl}/balades`;

  constructor(private http: HttpClient) {}

  getWalks(): Observable<RawBalade[]> {
    return this.http.get<RawBalade[]>(this.apiUrl);
  }

  getTransformedWalks(): Observable<BaladeModel[]> {
    return this.getWalks().pipe(
      map((walks: RawBalade[]) =>
        walks.map((walk) => {
          const imagePath = walk.content?.sections?.[0]?.content?.find(
            (item) => item.type === 'image/normal'
          )?.path;

          return {
            id: walk.id,
            name: walk.name,
            description: walk.catchPhrase,
            image: imagePath
              ? `${this.backendBaseUrl}${imagePath}`
              : 'assets/images/default.jpg',
            duration: walk.duration,
            location: walk.location,
            ratings:
              walk.ratings.length > 0
                ? walk.ratings.reduce((a, b) => a + b, 0) / walk.ratings.length
                : 0,
            favoriteIds: walk.favoriteIds,
            tagIds: walk.tagIds,
            tags: walk.tags,
          } as BaladeModel;
        })
      )
    );
  }

  getWalkById(id: number): Observable<RawBalade> {
    return this.http.get<RawBalade>(`${this.apiUrl}/${id}`);
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
}
