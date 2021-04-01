import { Component, VERSION, OnInit, ViewChild } from '@angular/core';

import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { Result } from '@zxing/library';
import { Appointment } from 'src/app/models/appointment';
import { NgAuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mechanichome',
  templateUrl: './mechanichome.component.html',
  styleUrls: ['./mechanichome.component.scss']
})
export class MechanichomeComponent implements OnInit {

  ngVersion = VERSION.full;

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  constructor(
    private ngAuthService:NgAuthService,
  ) { }

  ngOnInit(): void {this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
    this.hasCameras = true;

    console.log('Devices: ', devices);
    this.availableDevices = devices;

    // selects the devices's back camera by default
    // for (const device of devices) {
    //     if (/back|rear|environment/gi.test(device.label)) {
    //         this.scanner.changeDevice(device);
    //         this.selectedDevice = device;
    //         break;
    //     }
    // }
  });

      this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
    this.hasPermission = answer;
  });

  }

  handleQrCodeResult(resultString: string) {
    console.log('Result: ', resultString);
    this.qrResultString = resultString;
  }

  InputAid(Aid:string){

    this.qrResultString = Aid;

  }

}
