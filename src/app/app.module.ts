import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RegionResolver, CategoryResolver, SectionResolver, ItemResolver } from './path-resolver.service';
import { RegionListComponent } from './region-list/region-list.component';
import { GenericListComponent } from './generic-list/generic-list.component';
import { SaveNameComponent } from './save-name/save-name.component';
import { RegionDetailComponent } from './region-detail/region-detail.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

const appRoutes: Routes = [
  {
    path: 'anatomy',
    children: [
      { 
        path: '',
        component: GenericListComponent
      },
      {
        path: ':regionId',
        resolve: {
          region: RegionResolver
        },
        children: [
          { 
            path: '',
            component: GenericListComponent,
          },
          {
            path: ':categoryId',
            resolve: {
              category: CategoryResolver
            },
            children: [
              { 
                path: '',
                component: GenericListComponent
              },
              {
                path: ':sectionId',
                resolve: {
                  section: SectionResolver
                },
                children: [
                  { 
                    path: '',
                    component: GenericListComponent
                  },
                  {
                    path: ':itemId',
                    resolve: {
                      item: ItemResolver
                    },
                    component: GenericListComponent
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {  
    path: '',  
    redirectTo: '/anatomy',
    pathMatch: 'prefix'
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
    providers: [RegionResolver, CategoryResolver, SectionResolver, ItemResolver],
    bootstrap: [AppComponent]
  })
export class AppModule { }
