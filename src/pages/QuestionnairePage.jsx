import { useState, useEffect } from "react";

const QuesstionnairePage = () => {
  const [questionnaire, setQuestionnaire] = useState([]);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      const response = await fetch("https://api.example.com/questionnaire");
      const data = await response.json();
      setQuestionnaire(data);
    };
    fetchQuestionnaire();
  }, []);

  return (
    <div>
      <h1>Questionnaire</h1>
      <ul>
        {questionnaire.map((question) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuesstionnairePage;
