# forms-js [![Build Status](https://travis-ci.org/forms-js/forms-js.svg)](https://travis-ci.org/forms-js/forms-js) [![Join the chat at https://gitter.im/forms-js/forms-js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/forms-js/forms-js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Forms JS is a form validation library intended to provide a backbone for other, framework-specific libraries.

# Overview

To use Forms JS for validation, begin by creating an instance of `Form` and providing it with validation rules and a form-data object.

```js
var formsjsForm = new formsjs.Form();
formsjsForm.formData = { // Input fields should read/write data to this object.
  username: "bvaughn"    // Default values can be provided.
};
formsjsForm.validationService = { // Maps field-names to validation rules.
  username: {                     // It should mirror the structure of form-data.
    required: true,
    type: "string"
  }
};
formsjsForm.submitFunction = function() {
  // You provide this function.
  // It is responsible for submitting your form data and returning a Promise.
  // This Promise should resolve/reject based on the response you receive after submitting.
};
```

Next you should wire your form inputs (the view) up with the `Form` instance so it can validate your data. (Note that Forms JS doesn't provide any view elements, only validation.) Each web component/Angular directive/React component/whatever should register itself like so:

```js
var attributeMetadata = formsjsForm.registerAttribute('username');

// AttributeMetadata defines an errorMessages Array.
// You should bind to it in your view as it is used to show validation errors.
attributeMetadata.errorMessages;

// AttributeMetadata exposes a method named validate().
// You should call it any time your view updates the field's value.
// It will (asynchronously) update the 'errorMessages' property.
attributeMetadata.validate();
```

You'll also want to override a form-submit event so that `Form` can require a valid state. If the current form-data is valid it will be submitted using the `submitFunction` you provided earlier.

```js
var formElement = document.getElementById('yourForm');

// Angular/jQuery style
$(formElement).on("submit", function() {
  formsjsForm.submitIfValid();

  return false;
});

// Plain JavaScript
formElement.addEventListener("submit", function() {
  event.preventDefault();

  formsjsForm.submitIfValid();
}), false);
```

# Installation

Forms JS is available on both [Bower](http://bower.io/) and [NPM](https://www.npmjs.com/) under the name `forms-js`. You can install the library like so:

```shell
bower install forms-js
npm install forms-js
```

# Building from Source

First install the toolchain with [NPM](https://www.npmjs.org/):

```shell
npm install
```

Now you can build source like so:

```shell
npm run build
```

And run tests like so:

```shell
npm run test:watch
```

Note that tests are run on *built* source so be sure to build first.
