import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CameraService } from './camera.service'
import { CameraState } from './types'

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScannerComponent {
  public readonly CameraState = CameraState

  constructor(public readonly camera: CameraService) {}
}
