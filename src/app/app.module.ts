import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RegionListComponent } from './region-list/region-list.component';
import { GenericListComponent } from './generic-list/generic-list.component';
import { SaveNameComponent } from './save-name/save-name.component';
import { RegionDetailComponent } from './region-detail/region-detail.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
// import { RegionEditComponent } from './region-edit/region-edit.component';

const appRoutes: Routes = [
// {
//   path: 'regions',
//   component: GenericListComponent
// },
{
  path: 'regions',
  component: GenericListComponent
},
{
  path: 'regions/:regionId',
  component: GenericListComponent
},
{
  path: 'regions/:regionId/:categoryId',
  component: GenericListComponent
},
{
  path: 'regions/:regionId/:categoryId/:sectionId',
  component: GenericListComponent
},
{
  path: 'regions/:regionId/:categoryId/:sectionId/:itemId',
  component: GenericListComponent
},

  // {
  //   path: 'regions/edit/:id',
  //   component: RegionEditComponent,
  //   data: { title: 'Edit Region' }
  // },
  
  {  
   path: '',
  redirectTo: '/regions',
  pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
  AppComponent,
  RegionListComponent,
  GenericListComponent,
  SaveNameComponent,
  RegionDetailComponent,
  BreadcrumbsComponent,
    // RegionCreateComponent,
    // RegionEditComponent
    ],
    imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
      )
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
export class AppModule { }
