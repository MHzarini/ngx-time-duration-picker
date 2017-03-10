# angular2-time-duration-picker

## Installation

To install this library, run:

```bash
$ npm install angular2-time-duration-picker --save
```

## Requirements ##
* [Angular](https://angular.io) (2.0.0+)

## UI Dependency ##
* [Twitter Bootstrap](http://getbootstrap.com) (3.3.5+)

## Installation ##

```
npm install angular2-number-picker -save
```
## usage ##
Import the TimeDurationPickerComponent in your `app.module` and add it to the declarations array.
Alternatively, you can import the TimeDurationPickerComponent to a shared module, to make it available across all modules in your Angular application.
You need to import the Angular FormsModule and ReactiveFormsModule as well.
and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { SampleModule } from 'angular2-time-duration-picker';

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

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<sampleComponent></sampleComponent>
```

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
