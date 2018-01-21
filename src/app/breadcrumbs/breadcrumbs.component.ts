import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable }           from 'rxjs/Observable';
import { empty } from "rxjs/observable/empty";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit {

  topName = 'Anatomy';
  topPath = '/anatomy';
  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
  }

}
