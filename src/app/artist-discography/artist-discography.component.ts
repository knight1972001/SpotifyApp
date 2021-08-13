import { Component, OnInit } from '@angular/core';
import {MusicDataService} from '../music-data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {
  albums:any;
  duplicateAlbums:any;
  artist:any;
  id:any;
  liveData:any;
  imageUrl:any;

  
  constructor(private dataService: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    this.liveData=this.dataService.getArtistById(this.id).subscribe(data=>{this.artist=data; this.imageUrl=this.artist.images[0].url;});
    this.liveData=this.dataService.getAlbumsByArtistId(this.id).subscribe(data=>{
      let nameArray=[];
      let newData=[];
      data.items.forEach((item)=>{
        if(!nameArray.includes(item.name.toLowerCase())){
          nameArray.push(item.name.toLowerCase());
          newData.push(item);
        }
      });
      this.albums=newData;
    });
  }

  ngOnDestroy(): void {
    this.liveData.unsubscribe();
  }
}
