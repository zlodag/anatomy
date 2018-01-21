import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './region-list.component.html',
  styleUrls: ['../common/list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegionListComponent {
  constructor(public route: ActivatedRoute) { }
}

@Component({
  templateUrl: './category-list.component.html',
  styleUrls: ['../common/list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryListComponent {
  constructor(public route: ActivatedRoute) { }
}

@Component({
  templateUrl: './section-list.component.html',
  styleUrls: ['../common/list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SectionListComponent {
  constructor(public route: ActivatedRoute) { }
}

@Component({
  templateUrl: './item-list.component.html',
  styleUrls: ['../common/list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemListComponent {
  constructor(public route: ActivatedRoute) { }
}