import { Injectable } from '@angular/core';

@Injectable()
export class AppStateService {

  private _edit : boolean = false;
  constructor() { }
  public get edit() : boolean {
  	return this._edit;
  }
  public set edit(value : boolean) {
  	this._edit = value;
  }

}
