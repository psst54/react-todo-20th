import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  DONE,
  IN_PROGRESS,
  OPEN,
  STATE_LIST,
} from 'components/kanbanBoard/constants';

const KEY = 'subjectList';

export default function useSubject() {
  const [subjectList, setSubjectList] = useState(getPreviousData);

  function getPreviousData() {
    const data = localStorage.getItem(KEY);

    if (!data) {
      const emptySubjectList = {};
      Object.keys(STATE_LIST).forEach((state) => {
        emptySubjectList[state] = [];
      });

      return emptySubjectList;
    }

    return JSON.parse(data);
  }

  function addSubject(newSubjectTitle) {
    const newSubject = {
      id: uuidv4(),
      title: newSubjectTitle,
      taskList: [],
    };

    const newSubjectList = {
      ...subjectList,
      OPEN: [...subjectList[OPEN], newSubject],
    };

    setSubjectList(newSubjectList);
    localStorage.setItem(KEY, JSON.stringify(newSubjectList));
  }

  function deleteSubject(state, subjectId) {
    const newSubjectList = {
      ...subjectList,
      [state]: subjectList[state].filter((subject) => subject.id !== subjectId),
    };

    setSubjectList(newSubjectList);
    localStorage.setItem(KEY, JSON.stringify(newSubjectList));
  }

  function addTaskToSubject(state, subjectId, newTaskTitle) {
    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      isCompleted: false,
    };

    const currentSubjectList = subjectList[state]; // state in which current state is located
    const currentSubject = currentSubjectList.find(
      (subject) => subject.id === subjectId
    );

    const newSubject = {
      ...currentSubject,
      taskList: [...currentSubject.taskList, newTask],
    };
    const newState = getStateByTaskList(newSubject.taskList);

    if (state !== newState) {
      // Case #1: subject is moved to another column
      const newSubjectList = {
        ...subjectList,
        [state]: currentSubjectList.filter(
          (subject) => subject.id !== subjectId
        ),
        [newState]: [...subjectList[newState], newSubject],
      };

      setSubjectList(newSubjectList);
      localStorage.setItem(KEY, JSON.stringify(newSubjectList));

      return;
    }

    // Case #2: subject remains in same column
    const newSubjectList = {
      ...subjectList,
      [state]: subjectList[state].map((subject) => {
        if (subject.id !== subjectId) {
          return subject;
        }

        const newTaskList = [...subject.taskList, newTask];

        return {
          ...subject,
          taskList: newTaskList,
          state: getStateByTaskList(newTaskList),
        };
      }),
    };

    setSubjectList(newSubjectList);
    localStorage.setItem(KEY, JSON.stringify(newSubjectList));
  }

  function deleteTaskFromSubject(state, subjectId, taskId) {
    const currentSubjectList = subjectList[state];
    const currentSubject = currentSubjectList.find(
      (subject) => subject.id === subjectId
    );

    const newSubject = {
      ...currentSubject,
      taskList: currentSubject.taskList.filter((task) => task.id !== taskId),
    };
    const newState = getStateByTaskList(newSubject.taskList);

    if (state !== newState) {
      // Case #1: subject is moved to another column
      const newSubjectList = {
        ...subjectList,
        [state]: currentSubjectList.filter(
          (subject) => subject.id !== subjectId
        ),
        [newState]: [...subjectList[newState], newSubject],
      };

      setSubjectList(newSubjectList);
      localStorage.setItem(KEY, JSON.stringify(newSubjectList));

      return;
    }

    // Case #2: subject remains in same column
    const newSubjectList = {
      ...subjectList,
      [state]: subjectList[state].map((subject) => {
        if (subject.id !== subjectId) {
          return subject;
        }

        const newTaskList = subject.taskList.filter(
          (task) => task.id !== taskId
        );

        return {
          ...subject,
          taskList: newTaskList,
          state: getStateByTaskList(newTaskList),
        };
      }),
    };

    setSubjectList(newSubjectList);
    localStorage.setItem(KEY, JSON.stringify(newSubjectList));
  }

  function toggleTaskInSubject(state, subjectId, taskId) {
    const currentSubjectList = subjectList[state];
    const currentSubject = currentSubjectList.find(
      (subject) => subject.id === subjectId
    );

    const newSubject = {
      ...currentSubject,
      taskList: currentSubject.taskList.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      ),
    };
    const newState = getStateByTaskList(newSubject.taskList);

    if (state !== newState) {
      // Case #1: subject is moved to another column
      const newSubjectList = {
        ...subjectList,
        [state]: currentSubjectList.filter(
          (subject) => subject.id !== subjectId
        ),
        [newState]: [...subjectList[newState], newSubject],
      };

      setSubjectList(newSubjectList);
      localStorage.setItem(KEY, JSON.stringify(newSubjectList));

      return;
    }

    // Case #2: subject remains in same column
    const newSubjectList = {
      ...subjectList,
      [state]: subjectList[state].map((subject) => {
        if (subject.id !== subjectId) {
          return subject;
        }

        const newTaskList = subject.taskList.map((task) =>
          task.id === taskId
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        );

        return {
          ...subject,
          taskList: newTaskList,
          state: getStateByTaskList(newTaskList),
        };
      }),
    };

    setSubjectList(newSubjectList);
    localStorage.setItem(KEY, JSON.stringify(newSubjectList));
  }

  return {
    subjectList,
    addSubject,
    deleteSubject,
    addTaskToSubject,
    deleteTaskFromSubject,
    toggleTaskInSubject,
  };
}

function getStateByTaskList(taskList) {
  const doneTaskCount = taskList.filter((task) => task.isCompleted).length;
  const totalTaskCount = taskList.length;

  if (doneTaskCount === 0) {
    return OPEN;
  }
  if (doneTaskCount === totalTaskCount) {
    return DONE;
  }
  return IN_PROGRESS;
}
