# Angular Inactivity Directive

Directive to detect user inactivity.
If delay set to 5 seconds, after 5 seconds it will check if there has been activity in the past 5 seconds. 
If so it will emit the event type and time stamp. If no events detected nothing will be emitted.

Accordingly the component to which this directive is attached can set a timer to handle user inactivity or activity how it sees fit. 
For example to log out a user.

The directive can be attached to the main app module or individual child components/modules so that different components/modules can handle activity/inactivity in their own way.
It is also easily customizable to add or remove the handled events.

## @Output()
activity
 - EventEmitter of event time stamp and type (allowing for different event types i.e. click or keyup to be handled differently)

## @Input()
activityDelay
 - Milliseconds at which to check for inactivity. (defaults to 15 seconds if input value not provided)

## Events Handled
- mouseup
- mousemove
- mousewheel
- keyup
- touchend
