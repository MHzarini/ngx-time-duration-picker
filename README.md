[![npm version](https://badge.fury.io/js/angular2-time-duration-picker.svg)](https://badge.fury.io/js/angular2-time-duration-picker)
# angular2-time-duration-picker

A generic time duration picker Angular component (v. 2.0.0+) for Twitter Bootstrap


![](https://raw.githubusercontent.com/MHzarini/angular2-time-duration-picker/master/docs/img/example.png)

## Installation

To install this library, run:

```bash
$ npm install angular2-time-duration-picker --save
```

## Requirements ##
* [Angular](https://angular.io) [![npm version](https://badge.fury.io/js/%40angular%2Fcore.svg)](https://badge.fury.io/js/%40angular%2Fcore)

## UI Dependency ##
* [Twitter Bootstrap](http://getbootstrap.com) (3.3.5+)

## usage ##
Import the TimeDurationPickerComponent in your `app.module` and add it to the declarations array.
Alternatively, you can import the TimeDurationPickerComponent to a shared module, to make it available across all modules in your Angular application.
You need to import the Angular FormsModule and ReactiveFormsModule as well.
and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the library
import { TimeDurationPickerModule } from 'angular2-time-duration-picker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ...
    TimeDurationPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components in your Angular application:

Add the `time-duration-picker` component to the page where you want to use the picker.
```html
<time-duration-picker [inputDisabled]=false units="Week | Day | Hour | Minute | Second | Millisecond" returnedValueUnit="Second" (onChange)="onNumberChanged($event)"></time-duration-picker>

```
## Field Schema
| Attribute        | Type           | Required  | Description |
| :------------- |:-------------| :-----:| :-----|
| units | [input] String | Yes | The units of the picker. pipe `|` seprated |
| returnedValueUnit | [input] String | No | The unit of returned Value. second by default |
inputDisabled | [input] Boolean | No | Defines if the input input should be disabled / editable by the user. true by default |
| onChange | (output) Number | No | The onChange event of the component. Emits the value of the number picker, every time the user has clicked the - or + button. |
## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Mohammad Nuairat](mailto:mhn.zarini@gmail.com)
