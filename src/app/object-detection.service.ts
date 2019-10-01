import { Injectable } from '@angular/core'
import { defer, from, Observable } from 'rxjs'
import {
  DetectedObject,
  load,
  ObjectDetection,
} from '@tensorflow-models/coco-ssd'
import { map, shareReplay, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ObjectDetectionService {
  private readonly model$: Observable<ObjectDetection> = defer(load).pipe(
    shareReplay(1),
  )

  detect(
    source: Parameters<ObjectDetection['detect']>[0],
  ): Observable<DetectedObject | void> {
    return this.model$.pipe(
      switchMap(model => from(model.detect(source))),
      map(([prediction]) => prediction),
    )
  }

  preloadModel() {
    this.model$.subscribe()
  }
}
