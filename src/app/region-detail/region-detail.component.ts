import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegionDetailComponent implements OnInit {

  region = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/regions/' + this.route.snapshot.params['regionId'])
    .subscribe(region => {
      this.region = region;
    });
    // this.route.params.subscribe(params => {
    //   this.getRegionDetail(params['id']);
    // });
    // this.route.params.switchMap(
    //   params => this.http.get('/api/regions/'+ params['id']) 
    //   // this.getRegionDetail()
    // ).subscribe(region => {
    //   this.region = region;
    // });
  }

  deleteRegion(id) {
    this.http.delete('/api/regions/'+id)
      .subscribe(res => {
          this.router.navigate(['../']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
