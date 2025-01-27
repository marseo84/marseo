import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import * as Prism from 'prismjs';

// prism languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';

@Component({
  selector: 'app-code-snippets',
  imports: [CommonModule],
  templateUrl: './code-snippets.component.html',
  styleUrl: './code-snippets.component.scss',
  standalone: true,
})
export class CodeSnippetsComponent implements AfterViewInit, OnChanges {
  @Input() codeSnippets: any[] = [];
  activeSnippetIndex = 0;
  activeLanguageIndex = 0;
  showResult = false;

  get currentLanguage() {
    return this.codeSnippets[this.activeSnippetIndex]?.languages[
      this.activeLanguageIndex
    ];
  }

  ngAfterViewInit(): void {
    this.highlightCode();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['codeSnippets']) {
      this.highlightCode();
    }
  }

  selectSnippet(index: number): void {
    this.activeSnippetIndex = index;
    this.activeLanguageIndex = 0;
    this.showResult = false;
    setTimeout(() => {
      this.highlightCode();
    });
  }

  toggleLanguage(index: number): void {
    this.activeLanguageIndex = index;
    this.highlightCode();
  }

  toggleResultView(): void {
    this.showResult = !this.showResult;
  }

  private highlightCode(): void {
    Prism.highlightAll();
  }
}
