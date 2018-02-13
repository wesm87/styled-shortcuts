import styledTransformProxy from 'styled-transform-proxy';

import templateWithShortcuts from './template-with-shortcuts';

// `styledTransformProxy` is curried so this returns a function that takes the original
// `styled` function as its only argument and returns the new `styled` function with all
// of its methods proxied to use the `templateWithShortcuts` transform.
const styledWithShortcuts = styledTransformProxy(templateWithShortcuts);

export default styledWithShortcuts;
