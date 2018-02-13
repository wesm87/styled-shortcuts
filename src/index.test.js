import styled from 'styled-components';
import { is, nth, tail } from 'ramda';

import withStyledShortcuts from './';

const styledWithShortcuts = withStyledShortcuts(styled);

describe('withStyledShortcuts', () => {
  it('is a function', () => {
    expect(is(Function, withStyledShortcuts)).toBe(true);
  });

  it('returns a function', () => {
    const result = withStyledShortcuts(styled);

    expect(is(Function, result)).toBe(true);
  });
});

const testStyled = (mockStyled) => {
  it('ignores non-string values', () => {
    const strings = ['foo'];
    const result = mockStyled(strings, 12, {}, []);
    const interpolations = tail(result.componentStyle.rules);

    interpolations.forEach((value) => {
      expect(is(Function, value)).toBe(false);
    });
  });

  it('converts string values to getter functions', () => {
    const strings = ['foo'];
    const result = mockStyled(strings, 'bar', 'baz', 'boz');
    const interpolations = tail(result.componentStyle.rules);

    interpolations.forEach((value) => {
      expect(is(Function, value)).toBe(true);
    });
  });

  it('returns the correct prop value for a non-dot-separated path', () => {
    const strings = ['foo'];
    const result = mockStyled(strings, 'bar');
    const getter = nth(1, result.componentStyle.rules);
    const value = getter({ bar: '15' });

    expect(value).toBe('15');
  });

  it('returns the correct prop value for a non-dot-separated path with a specified unit', () => {
    const strings = ['foo'];
    const result = mockStyled(strings, 'bar:px');
    const getter = nth(1, result.componentStyle.rules);
    const value = getter({ bar: '20' });

    expect(value).toBe('20px');
  });

  it('returns the correct prop value for a dot-separated path', () => {
    const strings = ['foo'];
    const result = mockStyled(strings, 'a.b');
    const getter = nth(1, result.componentStyle.rules);
    const value = getter({ a: { b: '5' } });

    expect(value).toBe('5');
  });

  it('returns the correct prop value for a dot-separated path with a specified unit', () => {
    const strings = ['foo'];
    const result = mockStyled(strings, 'a.b:rem');
    const getter = nth(1, result.componentStyle.rules);
    const value = getter({ a: { b: 10 } });

    expect(value).toBe('10rem');
  });

  it('does not append the specified unit if the value is `0`', () => {
    const strings = ['foo'];
    const result = mockStyled(strings, 'bar:px');
    const getter = nth(1, result.componentStyle.rules);
    const value = getter({ bar: 0 });

    expect(value).toBe('0');
  });
};

describe('The proxied `styled` function', () => {
  it('works with components, ie: styledWithShortcuts(Component)', () => {
    const Foo = () => 'foo';
    testStyled(styledWithShortcuts(Foo));
  });

  describe('has template functions for each HTML element, ie: styledWithShortcuts.div', () => {
    testStyled(styledWithShortcuts.div);

    it('has an `attrs()` function', () => {
      expect(is(Function, styledWithShortcuts.div.attrs)).toBe(true);
    });

    it('has an `attrs()` function that returns a template function', () => {
      testStyled(styledWithShortcuts.div.attrs({}));
    });

    it('has an `attrs()` function that is chainable', () => {
      testStyled(styledWithShortcuts.div.attrs({}).attrs({}));
    });

    it('has a `withConfig()` function', () => {
      expect(is(Function, styledWithShortcuts.div.withConfig)).toBe(true);
    });

    it('has a `withConfig()` function that returns a template function', () => {
      testStyled(styledWithShortcuts.div.withConfig({}));
    });

    it('has a `withConfig()` function that is chainable', () => {
      testStyled(styledWithShortcuts.div.withConfig({}).withConfig({}));
    });
  });
});
