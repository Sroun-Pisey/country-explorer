import { Component } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgForOf, NgIf, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  // Observable for countries data
  countries$!: Observable<any[]>;

  // Search and filter variables
  searchTerm = '';
  selectedRegion = '';

  // List of regions for filter dropdown
  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  constructor(private http: HttpClient) {
    // Fetch countries from API with selected fields
    this.countries$ = this.http.get<any[]>(
      'https://restcountries.com/v3.1/all?fields=name,cca3,flags,capital,population,area,region,subregion,languages,currencies'
    );
  }

  // Filter countries by search term and region
  filterCountries(countries: any[]): any[] {
    if (!countries) return [];

    let filtered = countries;

    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter(c =>
        c.name.common.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by region
    if (this.selectedRegion) {
      filtered = filtered.filter(c => c.region === this.selectedRegion);
    }

    return filtered;
  }

  // Helper: Convert languages object to string
  getLanguages(languages: any): string {
    return languages ? Object.values(languages).join(', ') : 'N/A';
  }

  // Helper: Convert currencies object to string
  getCurrencies(currencies: any): string {
    if (!currencies) return 'N/A';
    return Object.values(currencies)
      .map((c: any) => `${c.name} (${c.symbol})`)
      .join(', ');
  }

  // Helper: Convert borders array to string
  getBorders(borders: string[]): string {
    return borders && borders.length ? borders.join(', ') : 'N/A';
  }

  // Helper: Convert timezones array to string
  getTimezones(timezones: string[]): string {
    return timezones && timezones.length ? timezones.join(', ') : 'N/A';
  }

}
