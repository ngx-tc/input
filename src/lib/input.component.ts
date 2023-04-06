import {
  Component,
  OnInit,
  Input,
  forwardRef,
  HostBinding,
  ElementRef,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { ControlProperties, Size, size, TcSize, controlProperties, state } from '@ngx-tc/base';

@Component({
  selector: 'tc-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit, TcSize {
  @HostBinding('class') get class() {
    return 'tc-input';
  };
  @HostBinding('class.input-sm') get smSize() {
    return this.tcSize === size.sm;
  }
  @HostBinding('class.input-lg') get lgSize() {
    return this.tcSize === size.lg;
  }
  @HostBinding('class.input-focus') get focused() {
    return this.inputFocus;
  }
  @HostBinding('class.input-disabled') @Input() disabled: boolean | null = false;
  @HostBinding('class.input-readonly') @Input() readonly: boolean | null = false;
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() placeholder?: string;
  @Input() charLimiting?: number;
  @Input() prefix?: string | string[];
  @Input() suffix?: string | string[];
  @Input() prefixIcon?: string | string[];
  @Input() suffixIcon?: string | string[];
  @Input('size') tcSize: Size = size.default;
  @Input() required: boolean = false;
  @Input() autoSize: boolean = false;
  @Input('value') innerValue: string = '';
  @Input() bgColor?: string | string[];
  @Input() borderColor?: string | string[];
  @Input() color?: string | string[];

  @Output() focus: EventEmitter<void> = new EventEmitter<void>();
  @Output() blur: EventEmitter<void> = new EventEmitter<void>();

  inputFocus: boolean = false;
  simpleInput: boolean = true;
  charLength?: number;
  properties: ControlProperties = Object.assign({}, controlProperties);
  currentBgColor?: string;
  currentBorderColor?: string;
  currentColor?: string;
  states = state;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(public element: ElementRef) {}

  ngOnInit() {
    if (this.charLimiting && this.charLimiting > 0) {
      this.changeCharLength(this.charLimiting, this.innerValue.length);
    }

    if (this.autoSize) {
      setTimeout(() => {
        this.resizable(this.element.nativeElement.querySelector('.input-control'));
      }, 0);
    }

    for (let property in this.properties) {
      const isColor = property === 'prefixColor'
        || property === 'suffixColor'
        || property === 'prefixIconColor'
        || property === 'suffixIconColor'
        || property === 'placeholderColor';
      const key = property.replace('Color', '').replace('Value', '');

      if (this[key]) {
        this.properties[property] = (this[key] instanceof Array) ? this[key][isColor ? 1 : 0] : this[key];
      }
    }

    this.setStyles(!this.disabled ? this.states.default : this.states.disabled);
  }

  get value() {
    return this.innerValue;
  }

  set value(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
    }

    if (this.charLimiting && this.charLimiting > 0) {
      this.changeCharLength(this.charLimiting, this.innerValue.length);
    }
  }

  changeCharLength(limit: number, valLength: number) {
    this.charLength = (limit - valLength >= 0) ? limit - valLength : 0;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: string) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onFocus(disabled: boolean | null) {
    if (!this.inputFocus && !disabled) {
      this.element.nativeElement.querySelector('.input-control').focus();
      this.inputFocus = true;

      this.focus.emit();
      this.setStyles(this.states.focus);
    }
  }

  onBlur(disabled: boolean | null) {
    this.inputFocus = false;

    if (!disabled) {
      this.blur.emit();
      this.onTouched();
      this.setStyles(this.states.default);
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    (!this.inputFocus && !this.disabled && !this.readonly) ? this.setStyles(this.states.hover) : null;
  }
  @HostListener('mouseleave') onMouseLeave() {
    (!this.inputFocus && !this.disabled && !this.readonly) ? this.setStyles(this.states.default) : null;
  }

  resizable (el: any, factor?: number) {
    const INT: number = Number(factor) || 7.7;

    function resize() {
      el.parentElement.style.maxWidth = ((el.value.length * INT) + 4) + 'px';
    }

    const e = 'keyup, keypress, focus, blur, change'.split(',');

    for (let i = 0; i < e.length; i++) {
      el.addEventListener(e[i], resize, false);
    }

    resize();
  }

  setStyles(
    st: state,
    bg: string | string[] | undefined = this.bgColor,
    border: string | string[] | undefined = this.borderColor,
    color: string | string[] | undefined = this.color
  ) {
    let styleIndex: number;

    switch (st) {
      case this.states.hover:
        styleIndex = 1;
        break;
      case this.states.focus:
        styleIndex = 2;
        break;
      case this.states.disabled:
        styleIndex = 3;
        break;
      default:
        styleIndex = 0;
    }

    this.currentBgColor = bg instanceof Array ? bg[styleIndex] : bg;
    this.currentBorderColor = border instanceof Array ? border[styleIndex] : border;
    this.currentColor = color instanceof Array ? color[styleIndex] : color;
  }

  getStyles() {
    return {
      'background-color': this.currentBgColor,
      'border-color': this.currentBorderColor,
      'color': this.currentColor
    }
  }
}
