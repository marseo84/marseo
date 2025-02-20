import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
} from '@angular/core';
import { CodeSnippet } from '../../models/components.interface';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-php';

@Component({
  selector: 'app-code-snippets',
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './code-snippets.component.html',
  styleUrl: './code-snippets.component.scss',
  standalone: true,
})
export class CodeSnippetsComponent implements AfterViewInit, OnChanges {
  @Input() codeSnippets: CodeSnippet[] = [];
  @ViewChildren('codeElement') codeElements!: QueryList<ElementRef>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.highlightCode();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['codeSnippets']) {
      setTimeout(() => {
        this.highlightCode();
      });
    }
  }

  private highlightCode(): void {
    if (this.codeElements) {
      this.codeElements.forEach((el) => {
        const languageClass = el.nativeElement.classList[0];
        const language = languageClass?.replace('language-', '');

        if (typeof Prism !== 'undefined' && Prism.languages[language]) {
          Prism.highlightElement(el.nativeElement);
        }
      });
      this.cdr.detectChanges();
    }
  }
}
