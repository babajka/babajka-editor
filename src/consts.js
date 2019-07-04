import createConstants from './lib/utils/createConstants';

export const MARK_TYPES = createConstants('BOLD', 'CODE', 'ITALIC', 'STRIKE', 'UNDERLINE');

export const NODE_TYPES = createConstants('SECTION', 'H2', 'H3', 'LINK');

export const DEFAULT_NODE = 'P';

const { BOLD, CODE, ITALIC, UNDERLINE, STRIKE } = MARK_TYPES;

export const HOTKEYS = {
  [BOLD]: 'b',
  [ITALIC]: 'i',
  [UNDERLINE]: 'u',
  [STRIKE]: '~',
  [CODE]: '`',
};
