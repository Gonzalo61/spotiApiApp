import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
// import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent  {

  // paises: any[] = [];

  // constructor( private http:HttpClient) { 
  //   console.log("Constructor del Home llamado");
  //   this.http.get('https://restcountries.eu/rest/v2/lang/es').subscribe( (resp:any) =>{
  //     this.paises = resp;
  //     console.log(resp);
  //   } )
  // }

  nuevasCanciones: any[] = [];
  loading: boolean;
  mensajeError: string;
  error: boolean;

  constructor( private spotify:SpotifyService){

    this.loading = true;
    this.error = false;
    /*
    this.spotify.getNewReleases().subscribe( (data:any) => {
      //console.log(data.albums.items);
      this.loading = false;
      this.nuevasCanciones = data;
      }, (errorServicio) => {
        
        this.loading = false;
        this.error = true;
        this.mensajeError = (errorServicio.error.error.message);
      })*/

  }

  ngOnInit(): void {
    
    this.getNewReleases();
    
  }

  async getNewReleases() {
    (await this.spotify.getNewReleases())
     .subscribe((data: any) => {
      this.loading = false;
      this.nuevasCanciones = data;
     }, (e) => {
      this.loading = false;
      this.error = true;
      this.mensajeError = e.error.error.message;
      console.log(e);
     });
  }



}
