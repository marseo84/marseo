import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  // @Input() filterType: 'blog' | 'code' | 'project'; -- adjust in routes as well

  @Input() categories: string[] = []; // passed from the parent
  @Input() tags: string[] = []; // passed from the parent
  @Input() blogPosts: {
    title: string;
    content: string;
    category: string;
    tags: string[];
    date: string;
    popularity: number;
  }[] = []; // blog data

  @Output() filteredBlogPosts = new EventEmitter<any[]>();

  activeCategories: Set<string> = new Set(['all']);
  activeTags: Set<string> = new Set();

  searchText: string = '';
  sortOption: string = 'date';

  constructor() {}

  ngOnInit(): void {
    this.filterBlogPosts();
  }

  updateActiveFilters(type: 'categories' | 'tags', value: string): void {
    const activeFilters =
      type === 'categories' ? this.activeCategories : this.activeTags;

    if (value === 'all') {
      activeFilters.clear();
      if (type === 'categories') activeFilters.add('all');
    } else {
      if (activeFilters.has(value)) {
        activeFilters.delete(value);
      } else {
        activeFilters.add(value);
        activeFilters.delete('all');
      }
    }
    this.filterBlogPosts();
  }

  isActive(type: 'categories' | 'tags', value: string): boolean {
    const activeFilters =
      type === 'categories' ? this.activeCategories : this.activeTags;
    return activeFilters.has(value);
  }

  filterBlogPosts(): void {
    const filtered = this.blogPosts.filter((post) => {
      const matchesCategory =
        this.activeCategories.has('all') ||
        [...this.activeCategories].some((cat) => post.category.includes(cat));
      const matchesTag =
        this.activeTags.size === 0 ||
        [...this.activeTags].some((tag) => post.tags.includes(tag));

      const matchesSearch =
        post.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        post.content.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesCategory && matchesTag && matchesSearch;
    });

    this.filteredBlogPosts.emit(filtered);
  }

  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;
    this.searchText = inputElement?.value || '';
    this.filterBlogPosts();
  }

  // onSortOptionChange(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement | null;
  //   const selectedOption = selectElement?.value || 'date';
  //   // Perform sorting logic based on `selectedOption`
  //   console.log(`Selected Sort Option: ${selectedOption}`);
  // }

  onSortOptionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOption = selectElement.value;

    this.blogPosts.sort((a, b) => {
      if (this.sortOption === 'title') return a.title.localeCompare(b.title);
      if (this.sortOption === 'popularity') return b.popularity - a.popularity;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    this.filterBlogPosts();
  }
}
