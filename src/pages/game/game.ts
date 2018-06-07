import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  public imagen: String;
  public tirar: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imagen = './assets/imgs/png/1.png';
  }

  dados() {
    let i = Math.floor(Math.random() * 6) + 1;
    this.imagen = './assets/imgs/gif/'+i+'.gif';
    this.tirar = false;
  }

  reto() {
    let i = Math.floor(Math.random() * 15) + 1;
    this.imagen = './assets/imgs/png/'+i+'.png';
    this.tirar = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

}
