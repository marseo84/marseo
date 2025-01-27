import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CodegnettesService {
  private codegnettesUrl = 'assets/data/codegnettes.json';

  constructor(private http: HttpClient) {}

  getCodegnettes(): Observable<any[]> {
    return this.http.get<any[]>(this.codegnettesUrl);
  }

  getLatestCodegnettes(count: number): Observable<any[]> {
    return this.getCodegnettes().pipe(
      map((codegnettes) => codegnettes.slice(0, count))
    );
  }
}
