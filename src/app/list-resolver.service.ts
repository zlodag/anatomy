import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegionListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  	return this.http.get('/api/regions/');
  }
}

@Injectable()
export class CategoryListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  	return this.http.get('/api/categories', {params: {region : route.paramMap.get('regionId')}});
  }
}

@Injectable()
export class SectionListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  	return this.http.get('/api/sections', {params: {category : route.paramMap.get('categoryId')}});
  }
}

@Injectable()
export class ItemListResolver implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
  	return this.http.get('/api/items', {params: {section : route.paramMap.get('sectionId')}});
  }
}