export const OPEN = 'open';
const IN_PROGRESS = 'in-progress';
const DONE = 'done';

export const STATE_LIST = Object.freeze({
  [OPEN]: {
    title: 'Open',
    id: 'open',
  },
  [IN_PROGRESS]: {
    title: 'In Progress',
    id: 'in-progress',
  },
  [DONE]: {
    title: 'Done',
    id: 'done',
  },
});

export const COLOR = Object.freeze({
  [OPEN]: {
    background: '#31627e1a',
    border: '#0d5580',
  },
  [IN_PROGRESS]: {
    background: '#7267451a',
    border: '#785e17',
  },
  [DONE]: {
    background: '#2a5f2d1a',
    border: '#0b5c18',
  },
});
