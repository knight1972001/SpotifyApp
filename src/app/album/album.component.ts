import { Component, OnInit } from '@angular/core';
import {MusicDataService} from '../music-data.service'
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album:any;
  id:any;
  private liveData:any;
  imageUrl:any;
  tracks:any;
  tempData:any;
  constructor(private dataService: MusicDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    this.liveData=this.dataService.getAlbumById(this.id).subscribe(data=>{
      this.album=data;
      this.imageUrl=this.album.images[1].url;
      this.tracks=this.album.tracks.items;
    })
  }

  addToFavorite(id){
    // this.dataService.addToFavourites(id).subscribe((data)=>{
      
    //   // this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    //   // this.snackBar.open("This song exists in the list", "Done", { duration: 1500 });
    // },
    // (err)=>{
    //   console.log(err);
    //   this.snackBar.open("Adding to Favourites...", "Failed", { duration: 1500 });
    // })
    this.dataService.checkExist().subscribe((dataGet)=>{
      if(dataGet.includes(id)){
        this.snackBar.open("This song exists in the list", "Done", { duration: 3500 });
      }else{
        this.dataService.addToFavourites(id).subscribe(
          (data)=>{
            this.snackBar.open("Adding to Favourites...", "Done", { duration: 3500 });
          },
          (err)=>{
          console.log(err);
          this.snackBar.open("Adding to Favourites...", "Failed", { duration: 3500 });
        })
      }
    })

  }

  ngOnDestroy(): void {
    this.liveData.unsubscribe();
  }

}
