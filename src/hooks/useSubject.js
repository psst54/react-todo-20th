import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DONE, IN_PROGRESS, OPEN } from 'components/kanbanBoard/constants';

export default function useSubject() {
  const [subjectList, setSubjectList] = useState([]);

  function addSubject(newSubjectTitle) {
    const newSubject = {
      id: uuidv4(),
      title: newSubjectTitle,
      taskList: [],
      state: OPEN,
    };
    setSubjectList([...subjectList, newSubject]);
  }

  function deleteSubject(subjectId) {
    setSubjectList(subjectList.filter((subject) => subject.id !== subjectId));
  }

  function addTaskToSubject(subjectId, newTaskTitle) {
    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      isCompleted: false,
    };

    setSubjectList(
      subjectList.map((subject) => {
        if (subject.id !== subjectId) {
          return subject;
        }

        const newTaskList = [...subject.taskList, newTask];

        return {
          ...subject,
          taskList: newTaskList,
          state: getStateByTaskList(newTaskList),
        };
      })
    );
  }

  function deleteTaskFromSubject(subjectId, taskId) {
    setSubjectList((subjectList) =>
      subjectList.map((subject) => {
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
      })
    );
  }

  function toggleTaskInSubject(subjectId, taskId) {
    setSubjectList(
      subjectList.map((subject) => {
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
      })
    );
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
