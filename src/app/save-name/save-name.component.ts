import { Component, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-save-name',
  templateUrl: './save-name.component.html',
  styleUrls: ['./save-name.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SaveNameComponent implements OnInit {

  add = false;
  data = {};

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('sectionId')) {
        if (!this.data['category']) {
          this.data['category'] = 1;
        }
      } else {
        delete this.data['category'];
      }
    });
  }

  onSubmit(){
  	this.saveData.emit(this.data);
  	this.add = false;
  	this.data = {};
  }

  @Output() saveData: EventEmitter<Object> = new EventEmitter();

}
