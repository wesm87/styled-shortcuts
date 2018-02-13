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

export const dotPath = useWith(path, [split('.'), identity]);

export const appendUnit = curry((unit, value) =>
  pipe(
    Number,
    defaultTo(0),
    String,
    unless(
      equals('0'),
      concat(__, unit)
    ),
  )(value)
);
