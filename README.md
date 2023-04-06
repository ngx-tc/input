## About

The ngx-tc/input library is an Angular module that provides custom form inputs to developers. It is designed to simplify the process of creating custom inputs and to make it easy to create inputs that meet specific requirements.

The ngx-tc/input library is built using Angular and is designed to be lightweight and easy to use. Minimal setup is required to get started, and the library is fully compatible with reactive forms and template-driven forms. It also includes features like validation, disabled/enabled inputs, and various styles to give users more control over the look and feel of their forms.

## Usage

Install `@ngx-tc/input` in your project:

```
npm install @ngx-tc/input
```

Import `TcInputModule` e.g. in your `app.module.ts`:
```typescript
import { TcInputModule } from '@ngx-tc/input';

@NgModule({
  imports: [
    ...
    TcInputModule
  ],
})
export class AppModule {}
```

Use the `tc-input` component in you app:
```html
<tc-input formControlName="controlName"></tc-input>
```

## Demo
To view a working demo of the library in action, please follow the provided link. The demo will allow you to explore the various components and features included in this library and see how they can be used in your Angular applications.
[http://tc-library.type-code.pro/#/components/inputs](http://tc-library.type-code.pro/#/components/inputs)
