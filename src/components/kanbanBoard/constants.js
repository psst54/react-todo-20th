const STATE_KEYS = Object.freeze({
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
});

export const STATE_LIST = Object.freeze({
  [STATE_KEYS.OPEN]: {
    title: 'Open',
    id: 'open',
  },
  [STATE_KEYS.IN_PROGRESS]: {
    title: 'In Progress',
    id: 'in-progress',
  },
  [STATE_KEYS.DONE]: {
    title: 'Done',
    id: 'done',
  },
});

export const COLOR = Object.freeze({
  [STATE_KEYS.OPEN]: {
    background: '#31627e1a',
    border: '#0d5580',
  },
  [STATE_KEYS.IN_PROGRESS]: {
    background: '#7267451a',
    border: '#785e17',
  },
  [STATE_KEYS.DONE]: {
    background: '#2a5f2d1a',
    border: '#0b5c18',
  },
});
