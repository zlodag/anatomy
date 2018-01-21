import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemDetailComponent implements OnInit {

  constructor(public route: ActivatedRoute, private http: HttpClient) { }

  private apiUrl : string;

  data = {};

  updateOptions : {key: string; label: string;}[] = [
  	{key: 'introduction', label: 'Introduction'},
  	{key: 'superiorRelations', label: 'Superior relations'},
  	{key: 'inferiorRelations', label: 'Inferior relations'},
  ];

  selectedKey = "";

  ngOnInit() {
  	this.apiUrl = '/api/items/' + this.route.snapshot.paramMap.get('itemId');
  	for (var i = 0; i < this.updateOptions.length - 1; i++) {
  		let option = this.updateOptions[i];
  		let value = this.route.snapshot.data.item[option.key];
  		if (value) {
			this.data[option.key] = value;
  		}
  	}
  	// this.introduction = this.route.snapshot.data.item.introduction || "";
  }

  // getUpdateObject(key: string, trimmedValue: string){
  // 	let updateObject = {};
  // 	updateObject[key] = trimmedValue;
  // 	return  trimmedValue.length ? updateObject : {'$unset': updateObject };
  // }

  // updateIntroduction(){
  // 	this.introduction = this.introduction.trim();
  //   this.http.put('/api/items/' + this.route.snapshot.paramMap.get('itemId'), this.getUpdateObject('introduction', this.introduction))
  //       .subscribe(() => {
  //       	this.route.snapshot.data.item.introduction = this.introduction;
  //       });
  // }

  update(){
  	this.data[this.selectedKey] = this.data[this.selectedKey].trim();
  	let updateObject = {};
  	updateObject[this.selectedKey] = this.data[this.selectedKey];
  	this.http.put(this.apiUrl, this.data[this.selectedKey].length ? updateObject : {'$unset': updateObject })
        .subscribe(() => {
        	this.route.snapshot.data.item[this.selectedKey] = this.data[this.selectedKey];
        });
  }

}
