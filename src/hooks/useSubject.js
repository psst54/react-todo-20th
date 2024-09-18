import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function useSubject() {
  const [subjectList, setSubjectList] = useState([]);

  const addSubject = (newSubjectTitle) => {
    const newSubject = {
      id: uuidv4(),
      title: newSubjectTitle,
      taskList: [],
    };
    setSubjectList([...subjectList, newSubject]);
  };

  return { subjectList, addSubject };
}
