import { Component, OnInit } from '@angular/core';
import {MusicDataService} from '../music-data.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites:Array<any>;
  private liveData:any;

  constructor(private dataService: MusicDataService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.liveData=this.dataService.getFavourites().subscribe(data=>{
      
      this.favourites=data.tracks;
    })
  }

  removeFromFavourites(id){
    this.dataService.removeFromFavourites(id).subscribe(data=>{
      this.snackBar.open("Removed from Favourites...", "Done", { duration: 1500 });
      this.router.navigate(['/']).then(()=>
      this.router.navigate(['/favourites'])
    )
    })
  }

}
