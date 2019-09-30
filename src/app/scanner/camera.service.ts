import { Injectable } from '@angular/core'
import { BehaviorSubject, EMPTY, from, Observable } from 'rxjs'
import { catchError, filter, shareReplay, switchMap, tap } from 'rxjs/operators'
import { CameraState } from './types'

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  public readonly state$: Observable<CameraState>

  public readonly mediaStream$: Observable<MediaStream>

  private readonly stateSubject$ = new BehaviorSubject(CameraState.Stale)

  constructor() {
    this.state$ = this.stateSubject$.asObservable()

    this.mediaStream$ = this.stateSubject$.pipe(
      filter(state => state === CameraState.AccessRequested),
      switchMap(() =>
        from(
          navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          }),
        ),
      ),
      tap(() => this.stateSubject$.next(CameraState.AccessGranted)),
      catchError(() => {
        this.stateSubject$.next(CameraState.AccessDenied)
        return EMPTY
      }),
      shareReplay(1),
    )
  }

  requestAccess() {
    this.stateSubject$.next(CameraState.AccessRequested)
  }
}
