import { Component, OnInit } from '@angular/core';
import { ApiService, Resource } from '../../services/api.service';

export interface GalleryItem {
  id: number;
  title: string;
  img: string;
}

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html'
})
export class ResourcesComponent implements OnInit {
  apiResources: Resource[] = [];
  loadingApi: boolean = true;

  galleryItems: GalleryItem[] = [
    { id: 1, title: 'Group Discussion', img: 'assets/images/career1.jpg' },
    { id: 2, title: 'Campus Placement', img: 'assets/images/career2.jpg' },
    { id: 3, title: 'Resume Workshop', img: 'assets/images/career3.jpg' },
    { id: 4, title: 'Interview Preparation', img: 'assets/images/career4.jpg' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getResources().subscribe({
      next: (data) => {
        this.apiResources = data;
        this.loadingApi = false;
      },
      error: (err) => {
        console.error('Error fetching resources:', err);
        this.loadingApi = false;
      }
    });
  }
}
