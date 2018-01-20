import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable }           from 'rxjs/Observable';
import { empty } from "rxjs/observable/empty";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  // regionObservable : Observable<any>;
  // categoryObservable : Observable<any>;
  // sectionObservable : Observable<any>;
  // itemObservable : Observable<any>;

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    // this.regionObservable = this.route.paramMap.switchMap(params => params.has('regionId') ? this.http.get('/api/regions/' + params.get('regionId')) : empty());
    // this.categoryObservable = this.route.paramMap.switchMap(params => params.has('categoryId') ? this.http.get('/api/categories/' + params.get('categoryId')) : empty());
    // this.sectionObservable = this.route.paramMap.switchMap(params => params.has('sectionId') ? this.http.get('/api/sections/' + params.get('sectionId')) : empty());
    // this.itemObservable = this.route.paramMap.switchMap(params => params.has('itemId') ? this.http.get('/api/items/' + params.get('itemId')) : empty());
  }

}
