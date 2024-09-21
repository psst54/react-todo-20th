import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DONE, IN_PROGRESS, OPEN } from 'components/kanbanBoard/constants';

const KEY = 'subjectList';

export default function useSubject() {
  const [subjectList, setSubjectList] = useState(getPreviousData);

  function getPreviousData() {
    const data = localStorage.getItem(KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  }

  function addSubject(newSubjectTitle) {
    const newSubject = {
      id: uuidv4(),
      title: newSubjectTitle,
      taskList: [],
      state: OPEN,
    };

    const newSubjectList = [...subjectList, newSubject];
    console.log(localStorage.getItem(KEY));

    setSubjectList(newSubjectList);
    localStorage.setItem(KEY, JSON.stringify(newSubjectList));
  }

  function deleteSubject(subjectId) {
    const newSubjectList = subjectList.filter(
      (subject) => subject.id !== subjectId
    );

    setSubjectList(newSubjectList);
    localStorage.setItem(KEY, JSON.stringify(newSubjectList));
  }

  function addTaskToSubject(subjectId, newTaskTitle) {
    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      isCompleted: false,
    };

    const newSubjectList = subjectList.map((subject) => {
      if (subject.id !== subjectId) {
        return subject;
      }

      const newTaskList = [...subject.taskList, newTask];

      return {
        ...subject,
        taskList: newTaskList,
        state: getStateByTaskList(newTaskList),
      };
    });

    setSubjectList(newSubjectList);
    localStorage.setItem(KEY, JSON.stringify(newSubjectList));
  }

  function deleteTaskFromSubject(subjectId, taskId) {
    const newSubjectList = subjectList.map((subject) => {
      if (subject.id !== subjectId) {
        return subject;
      }

      const newTaskList = subject.taskList.filter((task) => task.id !== taskId);

      return {
        ...subject,
        taskList: newTaskList,
        state: getStateByTaskList(newTaskList),
      };
    });

    setSubjectList(newSubjectList);
    localStorage.setItem(KEY, JSON.stringify(newSubjectList));
  }

  function toggleTaskInSubject(subjectId, taskId) {
    const newSubjectList = subjectList.map((subject) => {
      if (subject.id !== subjectId) {
        return subject;
      }

      const newTaskList = subject.taskList.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      );

      return {
        ...subject,
        taskList: newTaskList,
        state: getStateByTaskList(newTaskList),
      };
    });

    setSubjectList(newSubjectList);
    localStorage.setItem(KEY, JSON.stringify(newSubjectList));
  }

  return {
    subjectList,
    addSubject,
    deleteSubject,
    taskHooks: { addTaskToSubject, deleteTaskFromSubject, toggleTaskInSubject },
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
