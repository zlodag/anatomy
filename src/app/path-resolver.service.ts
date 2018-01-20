import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegionResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  	return this.http.get('/api/regions/' + route.paramMap.get('regionId'));
  }
}

@Injectable()
export class CategoryResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  	return this.http.get('/api/categories/' + route.paramMap.get('categoryId'));
  }
}

@Injectable()
export class SectionResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  	return this.http.get('/api/sections/' + route.paramMap.get('sectionId'));
  }
}

@Injectable()
export class ItemResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  	return this.http.get('/api/items/' + route.paramMap.get('itemId'));
  }
}