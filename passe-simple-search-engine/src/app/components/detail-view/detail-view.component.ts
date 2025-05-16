import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PreviewImageComponent } from './preview-image/preview-image.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UsefulInfoComponent } from './useful-info/useful-info.component';
import { ContentComponent } from './content/content.component';
import { DatabaseService } from '../../services/database.service';

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
    private router: Router,
    private databaseService: DatabaseService
  ) {}

  async fetchBaladeWithTags(id: string): Promise<void> {
    try {
      // Récupérer la balade spécifique par ID
      const balade = await this.databaseService.getBalades({ id: Number(id) });

      if (balade.length > 0) {
        this.balade = balade[0]; // La balade correspondante

        // Récupérer les tags associés à la balade
        const tags = await Promise.all(
          this.balade.tagIds.map((tagId: number) =>
            this.databaseService.getTags({ id: tagId })
          )
        );

        this.tags = tags.flat(); // Associer les tags à la balade
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la balade :', error);
    }
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id) {
        await this.fetchBaladeWithTags(id);
      }
    });
  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }
}
