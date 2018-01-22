import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppStateService } from '../app-state.service';
import { DetailField, DETAIL_FIELDS } from './detail-field';

@Component({
  templateUrl: './item-detail.component.html',
  styles: ['.glyphicon:hover {cursor: pointer;}'],
  encapsulation: ViewEncapsulation.None
})
export class ItemDetailComponent implements OnInit {

  constructor(public route: ActivatedRoute, private http: HttpClient, public appState: AppStateService) { }

  private detailFields = DETAIL_FIELDS;

  ngOnInit() {}

  updateField(field: DetailField, remove: boolean, arrayIndex?: number){
    let operator: string;
    let sendValue: string;
    if (field.array){
      if (remove) {
        operator = '$pull';
        sendValue = this.route.snapshot.data.item[field.key][arrayIndex];
      } else {
        operator = '$addToSet';
        sendValue = prompt('Add new item to "' + field.label + '"');
        if (sendValue) {
          sendValue = sendValue.trim();
        }
        if (!sendValue) {
          return;
        };
      }
    } else {
      if (remove) {
        operator = '$unset';
        sendValue = null;
      } else {
        operator = '$set';
        sendValue = prompt('Update value for "' + field.label + '"', this.route.snapshot.data.item[field.key] || "");
        if (sendValue) {
          sendValue = sendValue.trim();
        }
        if (!sendValue) {
          return;
        };
      }
    }
    let updateObject = {};
    updateObject[operator] = {};
    updateObject[operator][field.key] = sendValue;
    this.http.put('/api/items/' + this.route.snapshot.paramMap.get('itemId'), updateObject).subscribe((data) => {
      if (field.array){
        if (remove) {
          this.route.snapshot.data.item[field.key].splice(arrayIndex, 1);
        } else {
          this.route.snapshot.data.item[field.key].push(sendValue);
        }
      } else {
        if (remove) {
          delete this.route.snapshot.data.item[field.key];
        } else {
          this.route.snapshot.data.item[field.key] = sendValue;
        }
      }
    }, (error) => {
      console.error(error);
    });
  }
}
