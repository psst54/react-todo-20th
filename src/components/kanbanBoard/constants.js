export const OPEN = 'OPEN';
export const IN_PROGRESS = 'IN_PROGRESS';
export const DONE = 'DONE';

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
