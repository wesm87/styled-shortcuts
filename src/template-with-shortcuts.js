import { pipe, when, unless, always, is, isEmpty } from 'ramda';

import { dotPath, appendUnit } from './utils';

const mapInterpolationToGetter = when(is(String), (value) => {
  const [stringPath, unit = ''] = value.split(':');

  return pipe(
    dotPath(stringPath),
    unless(
      always(isEmpty(unit)),
      appendUnit(unit),
    ),
  );
});

const templateWithShortcuts = (strings, ...interpolations) => [
  strings,
  ...interpolations.map(mapInterpolationToGetter),
];

export default templateWithShortcuts;
