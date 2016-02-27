# react-key-handler 🔑

[![npm version](https://img.shields.io/npm/v/react-key-handler.svg)](https://www.npmjs.com/package/react-key-handler) [![License](https://img.shields.io/npm/l/react-key-handler.svg)](https://www.npmjs.com/package/react-key-handler) [![Build Status](https://travis-ci.org/producthunt/react-key-handler.svg)](https://travis-ci.org/producthunt/react-key-handler)

React component to handle key events.

## Usage

```jsx
import React from 'react';
import KeyHandler, {M} from 'react-key-handler';

export default React.createClass({
  getInitialState() {
    return { showMenu: false };
  },

  render() {
    const {showMenu} = this.state;

    return (
      <div>
        <KeyHandler keyCode={M} onKeyHandle={this.toggleMenu} />

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

    this.setState({ showMenu: !this.state.showMenu });
  },
});
```

The props types of the `KeyHandler` component are:

```js
type Props = {
  keyEventName: string,
  keyCode: number,
  onKeyHandle: Function,
};
```

`keyEventName` will default to `'keyup'`.

## Installation

```sh
$ npm install
```

## Development

To start the server:

```sh
$ npm start
```

This starts a webpack-dev-server, which is a little node.js Express server:

```sh
$ open http://localhost:8080
```

## Tests

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
