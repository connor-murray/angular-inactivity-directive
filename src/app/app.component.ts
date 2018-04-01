import {Component} from '@angular/core';
import {InactivityEvent} from './inactivity-event.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  onActivityDetected(event: InactivityEvent): void {
    console.log(`Event: ${event.eventType} at ${new Date(event.eventTimeStamp)}`);
  }
}
