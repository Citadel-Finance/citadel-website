import Vue from 'vue';

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
  setInteractionMode,
} from 'vee-validate';

import * as rules from 'vee-validate/dist/rules';

const addressPattern = new RegExp('^0x[a-fA-F0-9]{40}$');

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
setInteractionMode('eager');

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule],
  });
});

extend('address', {
  validate: (value) => addressPattern.test(value),
  message: 'You entered an invalid {_field_}!',
});

extend('number', {
  validate: (value) => /^[0-9]+([,.][0-9]+)?$/g.test(value),
  message: 'The {_field_} field must have numbers.',
});

export default ({ app }) => {
  configure({
    defaultMessage: (_field_, values) => app.i18n.t(`messages.${values._rule_}`, values),
  });
};
