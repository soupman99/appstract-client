import {Component, NgZone, ViewEncapsulation} from '@angular/core';

import {ipcRenderer, shell} from  'electron';
const storage = require('electron-storage');


import {SocketService} from './components/socket/services/socket.service';
import { MousePositionService } from './components/mouse/services/mousePosition.service';


@Component({
    selector: 'my-app',
    template: require('./app.component.pug'),
    styles:[require('./app.component.css')],
    encapsulation: ViewEncapsulation.None

})
export class AppComponent{
    connected = false;
    message = 'asdf is the sample messagexxx.';
    public socket:any;

    constructor(public socketService: SocketService, private mousePositionService: MousePositionService, private zone: NgZone) {

    }

    viewCanvas(){
        shell.openExternal('http://localhost:4200')
    }
    quit(){
        console.log("sending quit")
        ipcRenderer.send('quit');
    }
    restart(){
        ipcRenderer.send('restart');

    }


}
