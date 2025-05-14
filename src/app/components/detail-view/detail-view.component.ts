import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PreviewImageComponent } from './preview-image/preview-image.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UsefulInfoComponent } from './useful-info/useful-info.component';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PreviewImageComponent,
    TopBarComponent,
    UsefulInfoComponent,
    ContentComponent,
  ],
})
export class DetailViewComponent implements OnInit {
  balade: any;
  tags: any[] = [];
  id: string | null = null;
  detail: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('ID récupéré (via subscribe) :', id);
      if (id) {
        this.http.get(`http://localhost:3000/balades/${id}`).subscribe({
          next: (data) => {
            this.balade = data;

            this.http
              .get('http://localhost:3000/tags')
              .subscribe((tags: any) => {
                console.log('Tous les tags:', tags);
                this.tags = tags.filter(
                  (tag: any) =>
                    this.balade.tagIds &&
                    this.balade.tagIds.includes(Number(tag.id))
                );
                console.log('Tags associés:', this.tags);
              });
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des données:', err);
          },
        });
      } else {
        console.log('Aucun ID trouvé');
      }
    });
  }
  navigateBack(): void {
    this.router.navigate(['/']);
  }
}
