import { isValid, isBefore } from 'date-fns';
import isLength from 'validator/lib/isLength';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

class Validator {
  constructor(errors, name, value) {
    this.errors = errors;
    this.name = name;
    this.value = value;
  }

  isRequired(message) {
    if (!this.value) {
      this.errors[this.name] = message;
    }
    return this;
  }

  isMobilePhone(message, locale) {
    if (this.value && !isMobilePhone(this.value, locale)) {
      this.errors[this.name] = message;
    }
    return this;
  }

  isEmail(message) {
    if (this.value && !isEmail(this.value)) {
      this.errors[this.name] = message;
    }
    return this;
  }

  lengthLimit(max, message) {
    if (
      this.value &&
      !isLength(String(this.value), {
        min: 0,
        max
      })
    ) {
      this.errors[this.name] =
        message || `Text length can't exceed ${max} chars.`;
    }
    return this;
  }

  isDateBefore(date, message) {
    if (this.value && isValid(this.value) && isBefore(this.value, date)) {
      this.errors[this.name] = message;
    }
    return this;
  }
}

export default function factory(errors, name, value) {
  const validator = new Validator(errors, name, value);
  return validator;
}
