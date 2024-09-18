import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function useSubject() {
  const [subjectList, setSubjectList] = useState([]);

  function addSubject(newSubjectTitle) {
    const newSubject = {
      id: uuidv4(),
      title: newSubjectTitle,
      taskList: [],
    };
    setSubjectList([...subjectList, newSubject]);
  }

  function deleteSubject(subjectId) {
    setSubjectList(subjectList.filter((subject) => subject.id !== subjectId));
  }

  return { subjectList, addSubject, deleteSubject };
}
