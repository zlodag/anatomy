import { Component, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewItemComponent implements OnInit {

  add = false;
  name = "";
  category = 1;

  constructor(private http: HttpClient, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   if (params.has('sectionId')) {
    //     if (!this.data['category']) {
    //       this.data['category'] = 1;
    //     }
    //   } else {
    //     delete this.data['category'];
    //   }
    // });
  }

  newRegion() {
      this.http.post('api/regions', {name: this.name}).subscribe(this.onSuccess, this.onError);;
  }

  newCategory() {
      this.http.post('api/categories', {name: this.name, region: this.route.snapshot.paramMap.get('regionId')}).subscribe(this.onSuccess, this.onError);;
  }

  newSection() {
      this.http.post('api/sections', {name: this.name, category: this.route.snapshot.paramMap.get('categoryId')}).subscribe(this.onSuccess, this.onError);;
  }

  newItem() {
      this.http.post('api/items', {name: this.name, category: this.category, section: this.route.snapshot.paramMap.get('sectionId')}).subscribe(this.onSuccess, this.onError);
  }

  onSuccess = newItem => {
      this.router.navigate([newItem._id], {relativeTo: this.route}).then(() => {
        (this.route.snapshot.data.itemList || this.route.snapshot.data.sectionList || this.route.snapshot.data.categoryList || this.route.snapshot.data.regionList).push(newItem);
      });
  }

  onError = (error) => {
    console.error(error);
  }

}
