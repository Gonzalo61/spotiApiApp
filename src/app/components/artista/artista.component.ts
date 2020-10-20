import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent{

  artista:any = {};
  loading: boolean;
  canciones: any[] = [];

  constructor( private router:ActivatedRoute, private spotify:SpotifyService ) { 

    this.router.params.subscribe(params => {

      this.getArtista(params['id']);
      this.getCanciones(params['id']);

    })


  }

  async getArtista(id:string) {
    
    this.loading = true;
    (await this.spotify.getArtista(id))
    .subscribe( artista => {
      
      this.loading = false;
      this.artista = artista;
     })
  }



  async getCanciones(id:string) {
    
    this.loading = true;
    (await this.spotify.getCanciones(id))
    .subscribe( (topTrucks:any) => {
      
      //this.loading = false;
    this.canciones = topTrucks;
    
     })
  }

}
