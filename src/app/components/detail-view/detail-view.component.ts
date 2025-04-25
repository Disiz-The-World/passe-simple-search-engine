import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DetailViewComponent implements OnInit {
  balade: any;
  id: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID récupéré (via subscribe) :', id);
      if (id) {
        this.http.get(`http://localhost:3000/balades/${id}`).subscribe({
          next: (data) => {
            this.balade = data;
            console.log('Balade récupérée:', data);
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des données:', err);
          }
        });
      } else {
        console.log('Aucun ID trouvé');
      }
    });
  }
}