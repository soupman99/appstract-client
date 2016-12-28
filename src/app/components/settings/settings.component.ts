import {Component, Output, EventEmitter, NgZone} from '@angular/core';
const storage = require('electron-storage');
import {SocketService} from '../socket/services/socket.service';

import {ipcRenderer} from  'electron';

@Component({
    selector: 'settings',
    template: require('./settings.component.pug')
})
export class SettingComponent {

    @Output()
    settingsUpdate: EventEmitter<string> = new EventEmitter();



    public url: string;
    constructor(private zone: NgZone, private socketService:SocketService) {
        storage.get('settings')
            .then((data: any) => {
                this.url = data.socketio.url;
            })


    }

    saveUrl(url: string) {
        this.url = url;

        storage.set('settings', {
            socketio:{
                url:url
            }
        }).then(() => {
            console.log('The file was successfully written to the storage');
            this.zone.run(() => {
                this.settingsUpdate.emit('complete');
            })
        })
        .catch((err: any) => {
            console.error(err);
        });


    }


}
