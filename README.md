# Validate-amd

_Validate-amd library_

validate.js is a small library to help form validation. This library uses [amd](http://en.wikipedia.org/wiki/Asynchronous_module_definition) structure.

[![Build Status](https://travis-ci.org/elo7/validate-amd.svg?branch=master)](https://travis-ci.org/elo7/validate-amd)

It uses html5 form attributes validate specification and works on browsers that does not support html5 validation.
Then, we built it from scratch.

## Installation

Via [Bower](http://bower.io):

`bower install validate-amd`

Via [npm](http://npmjs.com):

`npm install validate-amd`

## Dependencies

Validate-amd depends on an [amd](http://en.wikipedia.org/wiki/Asynchronous_module_definition) implementation. We suggest [async-define](https://gist.github.com/sergiolopes/5778124) implementation for dependency lookup.
Validate-amd also depends on [doc-amd](https://github.com/elo7/doc-amd).

## Methods

#### validateForm
`.validateForm(selectorOrDocElement)`

###### Description:
Validate the form using almost all the html5 attributes validate spec. Returns a array with the error messages.

###### Parameters:
> selectorOrDocElement: doc-amd object or String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

###### Sample:
``` js
define(['validate'], function(Validate) {
  var validate = new Validate(),
      errors = validate.validateForm('#form');

  errors.forEach(function(error) {
    if (error.message) {
      // executes when there are errors
    }
  });
});
```

#### validateField
`.validateField(selectorOrElements)`

###### Description:
Validate individual fields. Returns an object with a error message.

###### Parameters:
> selectorOrDocElement: doc-amd object or String //A CSS selector. Note that, if it is a class name with dots, the dots must be escaped. E.g.: doc(".my\\\\.class")

###### Sample:
``` js
define(['validate'], function(Validate) {
  var validate = new Validate(),
      error = validate.validateField($('input[name=example1]'));

  if (error.message) {
    // executes when there are errors
  }
});
```

### Customize messages
`new Validate({ messages: object });`

###### Description:
Customize the error messages

###### Parameters:
> object: Object //An object with the properties messages ("required", "min", "max", "maxlength", "pattern" or "email")

###### Sample:
``` js
define(['validate'], function(Validate) {
   var custom_messages = {
      'required': 'Field required.',
      'min': 'Enter a value greater than or equal to {0}.',
      'max': 'Enter a value greater than or equal to {0}.',
      'maxlength': 'Enter a value with max length less than or equal to {0}.',
      'pattern': 'Enter a valid value.',
      'email': 'Enter a valid email address.',
      'url': 'Enter a valid url'
  }

  var validate = new Validate({ messages: custom_messages }),
      errors = validate.validate('#form');

      errors.forEach(function(error) {
        if (error.message) {
         // executes when there are errors
        }
      });
});
```

###### Default messages:
``` txt
 required: This field is required
 min: Please enter a value greater than or equal to {0}
 max: 'Please enter a value greater than or equal to {0}'
 maxlength: Please enter a value with max length less than or equal to {0}
 pattern: Please enter a valid value
 email: Please enter a valid email address
```

## License

Validate-amd is released under the [BSD](https://github.com/elo7/validate-amd/blob/master/LICENSE). Have at it.

* * *

Copyright :copyright: 2017 Elo7# validate-amd