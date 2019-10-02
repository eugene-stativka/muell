import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { BehaviorSubject, Observable } from 'rxjs'
import { distinctUntilChanged, map, tap } from 'rxjs/operators'
import { ObjectDetectionService } from '../object-detection.service'
import { PageMetaService } from '../page-meta.service'
import { CameraService } from './camera.service'
import { predictionToPhrase } from './prediction-to-phrase'
import { CameraState } from './types'

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        }),
      ),
      transition('void <=> *', animate(400)),
    ]),
  ],
})
export class ScannerComponent implements OnInit {
  public readonly CameraState = CameraState

  public readonly prediction$: Observable<string | void>

  private readonly predictionSubject$ = new BehaviorSubject<string | void>(
    undefined,
  )

  @ViewChild('video', { static: false })
  private readonly videoElement: ElementRef<HTMLVideoElement> | void = undefined

  constructor(
    public readonly camera: CameraService,
    private readonly detection: ObjectDetectionService,
    private readonly pageMeta: PageMetaService,
  ) {
    this.prediction$ = this.predictionSubject$.pipe(distinctUntilChanged())
  }

  ngOnInit() {
    this.detection.preloadModel()
    this.pageMeta.setMetaData({ title: '' })
  }

  detect() {
    if (this.videoElement === undefined) {
      return
    }

    this.predictionSubject$.next(undefined)

    this.detection
      .detect(this.videoElement.nativeElement)
      .pipe(
        map(prediction =>
          prediction
            ? predictionToPhrase(prediction)
            : 'No idea what it is 🤷🏻‍️. Try to change the camera angle or try to capture something else.',
        ),
        tap(prediction => this.predictionSubject$.next(prediction)),
      )
      .subscribe()
  }
}
