import {Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {auditTime, takeUntil} from 'rxjs/operators';
import {InactivityEvent} from './inactivity-event.model';

@Directive({
  selector: '[appInactivity]'
})
export class InactivityDirective implements OnInit, OnDestroy {
  @Output() activity = new EventEmitter<InactivityEvent>();
  @Input() activityDelay: number = 15000;

  private destroy$ = new Subject();
  private activitySubject = new Subject();
  private activity$: Observable<any> = this.activitySubject.asObservable();

  constructor() {
  }

  ngOnInit() {
    this.activity$.pipe(
      auditTime(this.activityDelay),
      takeUntil(this.destroy$)
    ).subscribe((event: InactivityEvent) => this.activity.emit(event));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('mouseup', ['$event.type', '$event.timeStamp'])
  @HostListener('mousemove', ['$event.type', '$event.timeStamp'])
  @HostListener('mousewheel', ['$event.type', '$event.timeStamp'])
  @HostListener('keyup', ['$event.type', '$event.timeStamp'])
  @HostListener('touchend', ['$event.type', '$event.timeStamp'])
  private onEvent(eventType: string, eventTimeStamp: number) {
    this.activitySubject.next({eventType: eventType, eventTimeStamp: eventTimeStamp});
  }
}
