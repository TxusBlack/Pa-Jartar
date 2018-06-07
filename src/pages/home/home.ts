import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';

import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import { Httpd, HttpdOptions } from '@ionic-native/httpd';
import {GamePage} from "../game/game";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tabs: String;
  public statusWifi;
  public networks: any;
  public hotspotStatus: boolean;
  public alertMessage: String;

  private options: HttpdOptions = {
    www_root: 'beber_con_memes_app', // relative path to app's www directory
    port: 80,
    localhost_only: false
  };
  public url;

  constructor(public navCtrl: NavController, private httpd: Httpd, private toastCtrl: ToastController, private hotspot: Hotspot) {
    this.hotspotStatus = false;
    this.tabs = 'server';
  }


  wifi() {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.networks = networks;
      for (let net of networks) {
        console.log(net.SSID);
      }
    });
  }

  createHotspot() {
    this.hotspot.isAvailable().then( res => {
      if (res == true) {
        this.hotspot.createHotspot('Bebe con Memes', 'WPA_PSK', 'qwerty1234').then( () => {
          console.log('Hotspot creado');
          this.hotspotStatus = true;
        });
      } else {
        this.alertMessage = 'Opción de Hotspot no disponible para este dispositivo';
      }
    });
  }

  onHotspot() {
    this.hotspot.startHotspot().then(res => {
      console.log(res);
      this.hotspotStatus = true;
    });
  }

  closeHotspot() {
    this.hotspot.stopHotspot().then( res => {
      this.hotspotStatus = false;
      this.hotspot.scanWifi();
      console.log(res);
    });
  }

  connect() {
    this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
      this.networks = networks;
      for (let net of networks) {
        console.log(net.SSID);
        if (net.SSID == 'Bebe con Memes') {
          this.hotspot.connectToWifi('Bebe con Memes', 'qwerty1234').then( res => {
            console.log(res);
          });
        }
      }
    });
  }

  startService() {
    let options: HttpdOptions = {
      www_root: 'el_bar_de_los_memes', // relative path to app's www directory
      port: 8080,
      localhost_only: false
    };

    this.httpd.startServer(options).subscribe((data) => {
      this.presentToast(data);
      console.log(data);
      console.log('Server is live');
    });
  }

  pushToGame() {
    this.navCtrl.push(GamePage);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
