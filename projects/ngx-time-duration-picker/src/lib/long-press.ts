import {
    Directive,
    Output,
    EventEmitter,
    HostBinding,
    HostListener
  } from '@angular/core';
  
  @Directive({
    selector: '[long-press]'
  })
  export class LongPress {
    longPressing: boolean;
    timeout: any;
    interval: any;
  
    @Output()
    onLongPressing = new EventEmitter();
  
    @HostBinding('class.longpress')
    get longPress() { return this.longPressing; }
  
    @HostListener('touchstart', ['$event'])
    @HostListener('mousedown', ['$event'])
    onMouseDown(event) {
      this.longPressing = false;
      this.timeout = setTimeout( () => {
        this.longPressing = true;
        this.interval = setInterval(() => {
          this.onLongPressing.emit(event);
        }, 50);
      }, 500 );
    }
  
    @HostListener('touchend')
    @HostListener('mouseup')
    @HostListener('mouseleave')
    endPress() {
      clearTimeout(this.timeout);
      clearInterval(this.interval);
      this.longPressing = false;
    }
  }
  