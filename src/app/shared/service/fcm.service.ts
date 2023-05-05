import {Injectable} from '@angular/core';
import { Firebase } from '@awesome-cordova-plugins/firebase/ngx';
import { Platform } from '@ionic/angular';
import { Firestore,collection, collectionData, addDoc, CollectionReference  } from '@angular/fire/firestore';


@Injectable()

export class FcmService{

    tokenCollection!: CollectionReference;

    constructor(
        private firebase: Firebase,
        private fs: Firestore,
        private platform: Platform){}

    async getToken(){
        let token;
        if(this.platform.is('android')){
            token = await this.firebase.getToken()
            console.log('androidtoken', token)
        }
        if(this.platform.is('ios')){
            token = await this.firebase.getToken()
            console.log('iostoken', token)
            await this.firebase.grantPermission()
        }

        this.saveToken(token)
    }

    private saveToken(token:any) {
        if(!token) return;
        const data = {
            token,
            userId: 'testUserId'
        }
        this.tokenCollection = token;
        return addDoc(this.tokenCollection, data).then((doc:any)=>{
            console.log('doc is', doc)
        })
    }

    onNotifications(){
        return this.firebase.onNotificationOpen();
    }
}