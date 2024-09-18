import { OPEN } from 'components/kanbanBoard/constants';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

  function addTaskToSubject(subjectId, newTask) {
    setSubjectList(
      subjectList.map((subject) =>
        subject.id === subjectId
          ? { ...subject, tasks: [...subject.tasks, newTask] }
          : subject
      )
    );
  }

  return {
    subjectList,
    addSubject,
    deleteSubject,
    taskHooks: { addTaskToSubject },
  };
}
