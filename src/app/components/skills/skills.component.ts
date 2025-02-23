import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  standalone: true,
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('tetrisGrid', { static: false }) tetrisGrid!: ElementRef;

  ngAfterViewInit(): void {
    this.createTetrisGrid(20, 10);
  }

  createTetrisGrid(rows: number, cols: number): void {
    const gridContainer = this.tetrisGrid.nativeElement;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, auto)`;

    const gridSize = gridContainer.offsetWidth;
    const cellSize = gridSize / cols;

    for (let i = 0; i < rows * cols; i++) {
      const cell = document.createElement('div');
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.classList.add('border', 'border-gray-700', 'p-0', 'm-0');
      gridContainer.appendChild(cell);
    }
  }
}
