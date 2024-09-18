import { useState } from 'react';

export default function useSubject() {
  const [subjectList, setSubjectList] = useState([]);

  const addSubject = (newSubjectTitle) => {
    const newSubject = {
      title: newSubjectTitle,
      taskList: [],
    };
    setSubjectList([...subjectList, newSubject]);
  };

  return { subjectList, addSubject };
}
