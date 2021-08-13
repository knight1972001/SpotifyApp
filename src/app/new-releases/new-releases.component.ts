import { Component, Input, OnInit } from '@angular/core';
import {MusicDataService} from '../music-data.service'
@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})

export class NewReleasesComponent implements OnInit {
  
  releases: any;
  albums: any;
  private liveData:any;
  
  constructor(private dataService: MusicDataService) { 
  }

  ngOnInit(): void {
    this.liveData=this.dataService.getNewReleases().subscribe(data=>{this.releases=data.albums.items;});
    
  }

  // ngOnDestroy(): void {
  //   this.liveData.unsubscribe();
  // }

}