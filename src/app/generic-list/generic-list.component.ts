import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable }           from 'rxjs/Observable';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GenericListComponent implements OnInit {

  items: Observable<any>;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.items = this.route.paramMap.switchMap(params => {
      let regionId = params.get('regionId');
      if (regionId) {
        let categoryId = params.get('categoryId');
        if (categoryId) {
          let sectionId = params.get('sectionId');
          if (sectionId) {
            return this.http.get('/api/items', {params: {section : sectionId}});
          }
          return this.http.get('/api/sections', {params: {category : categoryId}});
        }
        return this.http.get('/api/categories', {params: {region : regionId}});
      }
      return this.http.get('/api/regions');
    });
  }

  newItem(data) {
    this.route.paramMap
      .switchMap(params => {
        if (params.has('sectionId')) {
          return this.http.post('api/items', {name: data.name, section: params.get('sectionId'), category: data.category });
        } else if (params.has('categoryId')) {
          return this.http.post('api/sections', {name: data.name, category: params.get('categoryId')});
        } else if (params.has('regionId')) {
          return this.http.post('api/categories', {name: data.name, region: params.get('regionId')});
        } else {
          return this.http.post('api/regions', {name: data.name});
        }
      })
      .subscribe(res => {
        // console.log("it was successfully added");
          // this.getItems();
          let id = res['_id'];
          // console.log("the chosen id is " + id);
          this.router.navigate([id], {relativeTo: this.route});
        }, (err) => {
          console.log(err);
        }
      );
  }

}