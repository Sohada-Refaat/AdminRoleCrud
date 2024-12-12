import { Component, OnInit } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit{
  ngxLoaderType = ngxLoadingAnimationTypes.cubeGrid;
  showLoader: boolean = false;
  constructor(private _loaderService: LoaderService) { }

  ngOnInit() {
    this._loaderService.status.subscribe(show => {
      this.showLoader = show;
    });
  }
}
