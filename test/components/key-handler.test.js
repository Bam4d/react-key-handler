import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import {mount, render} from 'enzyme';

import KeyHandler, {KEYUP, KEYDOWN} from 'components/key-handler';

const M = 77;
const S = 83;

describe('KeyHandler', () => {
  it('renders nothing', () => {
    const el = render(<KeyHandler />);
    expect(el).to.be.blank();
  });

  it('handles key up events when key code match', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyCode={M} onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, M);

    expect(handler.calledOnce).to.equal(true);
  });

  it('handles key up events when key name match', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyName="m" onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, M);

    expect(handler.calledOnce).to.equal(true);
  });

  it('ignores key up events when no key code match', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyCode={S} onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, M);

    expect(handler.calledOnce).to.equal(false);
  });

  it('ignores key up events when no key name match', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyName="s" onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, M);

    expect(handler.calledOnce).to.equal(false);
  });

  it('ignores key up events when no key code or no names are passed', () => {
    const handler = sinon.spy();
    mount(<KeyHandler onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, M);

    expect(handler.calledOnce).to.equal(false);
  });

  it('handles key down events', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyCode={M} keyEventName={KEYDOWN} onKeyHandle={handler} />);

    triggerKeyEvent(KEYDOWN, M);

    expect(handler.calledOnce).to.equal(true);
  });
});

function triggerKeyEvent(eventName, keyCode) {
  const event = new window.KeyboardEvent(eventName, { keyCode });
  document.dispatchEvent(event);
}
