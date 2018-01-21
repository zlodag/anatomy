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

  updateOptions : {key: string; label: string; array: boolean}[] = [

  	{key: 'introduction', label: 'Introduction', array: false },
  	{key: 'structure', label: 'Structure', array: false },

  	{key: 'superiorRelations', label: 'Add superior relation', array: true },
  	{key: 'inferiorRelations', label: 'Add inferior relation', array: true },
  	{key: 'anteriorRelations', label: 'Add anterior relation', array: true },
  	{key: 'posteriorRelations', label: 'Add posterior relation', array: true },
  	{key: 'medialRelations', label: 'Add medial relation', array: true },
  	{key: 'lateralRelations', label: 'Add lateral relation', array: true },

  	{key: 'superiorBoundary', label: 'Superior boundary', array: false },
  	{key: 'inferiorBoundary', label: 'Inferior boundary', array: false },
  	{key: 'anteriorBoundary', label: 'Anterior boundary', array: false },
  	{key: 'posteriorBoundary', label: 'Posterior boundary', array: false },
  	{key: 'medialBoundary', label: 'Medial boundary', array: false },
  	{key: 'lateralBoundary', label: 'Lateral boundary', array: false },

  	{key: 'contents', label: 'Add content', array: true },
  	{key: 'articulations', label: 'Add articulation', array: true },
  	{key: 'attachments', label: 'Add attachment', array: true },
  	{key: 'specialStructures', label: 'Add special structure', array: true },

  	{key: 'nerveSupply', label: 'Nerve supply', array: false },
  	{key: 'arterialSupply', label: 'Arterial supply', array: false },
  	{key: 'venousDrainage', label: 'Venous drainage', array: false },
  	{key: 'lymphaticDrainage', label: 'Lymphatic drainage', array: false },

  	{key: 'variants', label: 'Add variant', array: true },

  ];

  selectedOption : {key: string; label: string; array: boolean} = null;

  ngOnInit() {
  	this.apiUrl = '/api/items/' + this.route.snapshot.paramMap.get('itemId');
  	for (var i = 0; i < this.updateOptions.length - 1; i++) {
  		let option = this.updateOptions[i];
  		if (!option.array) {
	  		let value = this.route.snapshot.data.item[option.key];
	  		if (value) {
				this.data[option.key] = value;
	  		}
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
  	this.data[this.selectedOption.key] = this.data[this.selectedOption.key].trim();
  	let updateObject = {};
  	updateObject[this.selectedOption.key] = this.data[this.selectedOption.key];
  	let add = !!this.data[this.selectedOption.key].length;
  	let array = this.selectedOption.array;
  	if (array && !add) {
  		console.error('Trying to delete from array?');
  		return;
  	}
  	let body = {};
  	body[array ? '$addToSet' : add ? '$set' : '$unset'] = updateObject;
  	this.http.put(this.apiUrl, body).subscribe((data) => {
  		if (array) {
			if (this.route.snapshot.data.item[this.selectedOption.key].indexOf(this.data[this.selectedOption.key]) == -1){
				this.route.snapshot.data.item[this.selectedOption.key].push(this.data[this.selectedOption.key]);
			}
			this.data[this.selectedOption.key] = "";
		} else if (add) {
			this.route.snapshot.data.item[this.selectedOption.key] = this.data[this.selectedOption.key];
		} else {
  			delete this.route.snapshot.data.item[this.selectedOption.key];
  		}
    }, (error) => {
    	console.error(error);
    });
  }

}
