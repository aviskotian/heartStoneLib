import { Component } from '@angular/core';
import { FcmService } from './shared/service/fcm.service';
import { ToastService } from './shared/service/toast.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private fcmService: FcmService,
    private toaster: ToastService) {
      this.notificationSetup()
    }

  private notificationSetup() {
    this.fcmService.getToken()
    this.fcmService.onNotifications().subscribe(
      (msg) => {
        this.toaster.presentToast(msg.body)
      });
  }

}
