import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { CitiesResponse, City } from '../../types/cities';
import { Nation, NationsResponse } from '../../types/nations';
import { DEPLOY_URL } from '../../main';
import { WebChannel } from '../mobile/web-channel';
import { ZipsResponse } from '../../types/zips';

type CitiesByFirstLetter = Record<string, Array<City>>;

type NationsByFirstLetter = Record<string, Array<Nation>>;

@Injectable({
  providedIn: 'root',
})
export class AddressAutocompleteService {
  constructor(
    @Inject(DEPLOY_URL) private deployUrl: string,
    private httpClient: HttpClient
  ) {
    this.initCities();
    this.initNations();
  }

  cities: CitiesByFirstLetter = {};
  nations: NationsByFirstLetter = {};
  filteredCities$ = new BehaviorSubject<Array<City>>([]);
  filteredNations$ = new BehaviorSubject<Array<Nation>>([]);
  zipCodes$ = new BehaviorSubject<Array<string>>([]);

  private initCities() {
    this.httpClient
      .get<CitiesResponse>('/enumeration/api/enumeration/mondino/caps', {
        headers: { 'Accept-Language': 'it' },
      })
      .pipe(
        map(async (response) => {
          this.cities = response.items.reduce((acc, curr) => {
            const currFirstChar = curr.label.charAt(0).toLowerCase();
            if (!acc[currFirstChar]) {
              acc[currFirstChar] = [];
            }
            acc[currFirstChar].push(curr);
            return acc;
          }, {} as CitiesByFirstLetter);
        })
      )
      .subscribe();
  }

  private initNations() {
    this.httpClient
      .get<NationsResponse>('/enumeration/api/enumeration/mondino/nations', {
        headers: { 'Accept-Language': 'it' },
      })
      .pipe(
        map(async (response) => {
          this.nations = response.items.reduce((acc, curr) => {
            const currFirstChar = curr.label.charAt(0).toLowerCase();
            if (!acc[currFirstChar]) {
              acc[currFirstChar] = [];
            }
            acc[currFirstChar].push(curr);
            return acc;
          }, {} as NationsByFirstLetter);
          WebChannel.postObject(
            'consoleLog',
            'Fetched ' + response.items.length + ' nations'
          );
        })
      )
      .subscribe();
  }

  filterCities(input: string) {
    input = this.sanitizeString(input);
    if (input.length < 2) {
      this.filteredCities$.next([]);
    } else {
      const firstChar = input.charAt(0);
      if (this.cities && this.cities[firstChar]) {
        this.filteredCities$.next(
          this.cities[firstChar.toLowerCase()]!.filter((c) =>
            c.label.toLowerCase().includes(input)
          )
        );
      }
    }
  }

  filterNations(input: string) {
    input = this.sanitizeString(input);
    if (this.nations && this.nations[input.charAt(0)]) {
      this.filteredNations$.next(
        this.nations[input.charAt(0).toLowerCase()]!.filter((c) =>
          c.label.toLowerCase().includes(input)
        )
      );
    }
  }

  onCitySelection(city: City, callback: (zipCodes: Array<string>) => void) {
    this.httpClient
      .get<ZipsResponse>(
        '/enumeration/api/enumeration/mondino/' + city.childName,
        { headers: { 'Accept-Language': 'it' } }
      )
      .subscribe((response) => {
        const list = response.items.map((item) => item.label);
        this.zipCodes$.next(list);
        if (response && response.items && response.items.length) {
          callback(list);
        }
      });
  }

  private sanitizeString(input: string): string {
    return input.replace('’', "'");
  }
}
