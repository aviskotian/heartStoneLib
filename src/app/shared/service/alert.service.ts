import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable()

export class AlertService {
  constructor(private alertCtrl: AlertController) {}

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}