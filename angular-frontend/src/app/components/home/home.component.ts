import { Component } from '@angular/core';

export interface Category {
  id: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  selectedCategory: Category | null = null;

  categories: Category[] = [
    {
      id: 'dev',
      icon: '💻',
      title: 'Software Development',
      description: 'Build software applications, web applications, and desktop systems.'
    },
    {
      id: 'ds',
      icon: '📊',
      title: 'Data Science',
      description: 'Analyze complex data sets, uncover insights, and build predictive models.'
    },
    {
      id: 'cs',
      icon: '🔒',
      title: 'Cyber Security',
      description: 'Protect network infrastructure, cloud systems, and data from cyber threats.'
    }
  ];

  selectCategory(category: Category): void {
    if (this.selectedCategory && this.selectedCategory.id === category.id) {
      this.selectedCategory = null; // Toggle off if clicked again
    } else {
      this.selectedCategory = category;
    }
  }
}
