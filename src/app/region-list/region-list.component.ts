import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegionListComponent implements OnInit {

  regions: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRegions();
  }

  private getRegions() {
    this.http.get('api/regions').subscribe(data => {
      console.log(data);
      this.regions = data;
    });
  }

  newRegion(name: string) {
    console.log("The new name is: " + name);
    this.http.post('/api/regions', {"name": name})
      .subscribe(res => {
        console.log("it was successfully added");
          // this.getRegions();
          let id = res['_id'];
          console.log("the chosen id is " + id);
          this.router.navigate([id], {relativeTo: this.route});
        }, (err) => {
          console.log(err);
        }
      );
  }

}
