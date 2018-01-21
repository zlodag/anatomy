import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['../common/list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegionListComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
  }

}
