import createConstants from './lib/utils/createConstants';

export const MARK_TYPES = createConstants('BOLD', 'CODE', 'ITALIC', 'STRIKE', 'UNDERLINE');

export const NODE_TYPES = createConstants('H1', 'H2', 'H3', 'LINK');

export const DEFAULT_NODE = 'paragraph';
