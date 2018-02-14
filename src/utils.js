// @flow

import {
  __,
  curry,
  pipe,
  identity,
  defaultTo,
  path,
  equals,
  concat,
  split,
  useWith,
  unless,
} from 'ramda';

/**
 * Gets a prop value using a dot-separated path composed of any combination of prop names
 * and/or array indices.
 *
 * @signature String -> Object -> *
 */
export const dotPath = useWith(path, [split('.'), identity]);

/**
 * Appends a unit to a numeric value if the value is not 0.
 */
export const appendUnit = curry((unit: string, value: number | string): string =>
  pipe(
    Number,
    defaultTo(0),
    String,
    unless(
      equals('0'),
      concat(__, unit),
    ),
  )(value)
);
