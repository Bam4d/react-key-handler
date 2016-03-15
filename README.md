# react-key-handler 🔑

[![npm version](https://img.shields.io/npm/v/react-key-handler.svg)](https://www.npmjs.com/package/react-key-handler) [![License](https://img.shields.io/npm/l/react-key-handler.svg)](https://www.npmjs.com/package/react-key-handler) [![Build Status](https://travis-ci.org/ayrton/react-key-handler.svg?branch=master)](https://travis-ci.org/ayrton/react-key-handler)

React component to handle keyboard events (such as keyup, keydown & keypress).

## Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
  1. [Decorators](#decorators)
  1. [Component](#component)
  1. [Form key handling](#form-key-handling)
1. [Key event names](#key-event-names)
1. [`keyValue`, `keyCode`, `keyName`](#keyvalue-keycode-keyname)
1. [Development](#development)
1. [Contributing](#contributing)
1. [License](#license)

## Installation

```sh
$ npm install react-key-handler --save
```

## Usage

You can use `react-key-handler` in two flavours:

- decorator
- component

Unless you want absolute flexibility we recommend you to use one of the decorators.

Both decorators use the `KeyHandler` component internally, for a full understanding
you can check out [the implementation](lib/components/key-handler.js).

### Decorators

This library includes two different decorators:

| Decorator          | Handles     |
| ------------------ | ----------- |
| `keyHandler`       | Key changes |
| `keyToggleHandler` | Key toggles |

Both decorators have the same API and both will decorate the given component with
a `keyValue`, `keyCode` and `keyName` property.

```jsx
import React from 'react';
import {keyHandler} from 'react-key-handler';

const S_KEY_CODE = 77;

function DecoratorDemo({keyCode}) {
  return (
    <div>
      {keyCode === S_KEY_CODE &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

export default keyHandler({keyCode: S_KEY_CODE})(DecoratorDemo);
```

The prop types of the `KeyHandler` component are:

| Name         | Type     | Required   | Default   |                                                   |
| ------------ | -------- | ---------- | --------- | ------------------------------------------------- |
| keyEventName | string   | yes        | `'keyup'` | `'keydown'`, `'keypress'` or `'keyup'`.           |
| keyValue     | string   | yes __\*__ |           | Any given [keyboard key]                          |
| keyCode      | number   | yes __\*__ |           | Any given [keyboard code]                         |
| keyName      | string   | yes __\*__ |           | Any given character                               |

__\*__ You should pass only one of these three props: `keyValue`, `keyCode` or `keyName`.

[Examples](demo/components/examples/decorators/)

### Component

```jsx
import React from 'react';
import KeyHandler from 'react-key-handler';

const S_KEY_CODE = 77;

export default React.createClass({
  getInitialState() {
    return {showMenu: false};
  },

  render() {
    const {showMenu} = this.state;

    return (
      <div>
        <KeyHandler keyCode={S_KEY_CODE} onKeyHandle={this.toggleMenu} />

        {showMenu &&
          <ol>
            <li>hello</li>
            <li>world</li>
          </ol>
        }
      </div>
    );
  },

  toggleMenu(event) {
    event.preventDefault();

    this.setState({showMenu: !this.state.showMenu});
  },
});
```

The prop types of the `KeyHandler` component are:

| Name         | Type     | Required   | Default   |                                                   |
| ------------ | -------- | ---------- | --------- | ------------------------------------------------- |
| keyEventName | string   | yes        | `'keyup'` | `'keydown'`, `'keypress'` or `'keyup'`.           |
| keyValue     | string   | yes __\*__ |           | Any given [KeyboardEvent.keyCode]                 |
| keyCode      | number   | yes __\*__ |           | Any given [KeyboardEvent.key]                    |
| keyName      | string   | yes __\*__ |           | Any given character                               |
| onKeyHandle  | function | yes        |           | Function that is called when they key is handled. |

__\*__ You should pass only one of these three props: `keyValue`, `keyCode` or `keyName`.

[Example](demo/components/examples/component/index.js)

### Form key handling

This library does not handle key events for form elements such as `<input />` and `<textarea />`.

React does a fine job supporting these already via [keyboard events](https://facebook.github.io/react/docs/events.html#keyboard-events).

[Examples](demo/components/examples/input/)

## Key event names

TODO: explain the differences between the different key events.

## `keyValue`, `keyCode`, `keyName`

Originally this library only supported [KeyboardEvent.keyCode], which is what is currently is most supported by browsers these days,
but this feature has been removed from the Web standards in favour of [KeyboardEvent.key].

We can't use the reserved [key] property, so we picked `keyValue`.

`keyName` was an in-between solution powered by [keycodes] to support human readable strings,
this property will be deprecated in future versions.

__Browser support:__

Internally we normalize deprecated HTML5 `keyValue` values and translate from legacy `keyCode` values,
similar to how React does this for their `SyntheticKeyboardEvent`.

Meaning you can safely use any property in any modern browser.

__More information:__

Read the [W3C Working Draft].

__TL;DR__:

Stick to standards, use `keyValue` over `keyCode`, avoid using `keyName`.

## Development

### Setup

```sh
$ git clone <this repo>
$ cd react-key-handler
$ npm install
```

### Getting started

To start the server:

```sh
$ npm start
```

This starts a webpack-dev-server, which is a little node.js Express server:

```sh
$ open http://localhost:8080
```

### Tests

To run all tests:

```sh
$ npm test
```

Or you can run the linters, unit tests and check for type errors individually:

```sh
$ npm run test:lint
$ npm run test:unit
$ npm run test:flow
```

## Contributing

Bug reports and pull requests are welcome on GitHub. This project is intended to be a
safe, welcoming space for collaboration, and contributors are expected to adhere
to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

## License

```
 _________________
< The MIT License >
 -----------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

[W3C Working Draft]: https://www.w3.org/TR/DOM-Level-3-Events-key/
[KeyboardEvent.key]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
[KeyboardEvent.keyCode]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
[keycodes]: https://www.npmjs.com/package/keycodes
[key]: https://facebook.github.io/react/docs/create-fragment.html
