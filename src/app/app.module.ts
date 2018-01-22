import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { RegionResolver, CategoryResolver, SectionResolver, ItemResolver } from './path-resolver.service';
import { RegionListResolver, CategoryListResolver, SectionListResolver, ItemListResolver } from './list-resolver.service';
import { AppStateService } from './app-state.service';
import { AppComponent } from './app.component';
import { GenericListComponent } from './generic-list/generic-list.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { EditButtonComponent } from './edit-button/edit-button.component';

const appRoutes: Routes = [
{
  path: 'anatomy',
  resolve: {
    regionList: RegionListResolver
  },
  children: [
  { 
    path: '',
    component: GenericListComponent
  },
  {
    path: ':regionId',
    resolve: {
      region: RegionResolver,
      categoryList: CategoryListResolver
    },
    children: [
    { 
      path: '',
      component: GenericListComponent,
    },
    {
      path: ':categoryId',
      resolve: {
        category: CategoryResolver,
        sectionList: SectionListResolver
      },
      children: [
      { 
        path: '',
        component: GenericListComponent
      },
      {
        path: ':sectionId',
        resolve: {
          section: SectionResolver,
          itemList: ItemListResolver
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
          component: ItemDetailComponent
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
  pathMatch: 'full'
}
];
@NgModule({
  declarations: [
    AppComponent,
    GenericListComponent,
    NewItemComponent,
    BreadcrumbsComponent,
    ItemDetailComponent,
    EditButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [
    AppStateService,
    RegionResolver,
    CategoryResolver,
    SectionResolver,
    ItemResolver,
    RegionListResolver,
    CategoryListResolver,
    SectionListResolver,
    ItemListResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
