import { useEffect, useState } from "react";

const QuesstionnairePage = () => {
  const [questionnaire, setQuestionnaire] = useState([]);

 

  useEffect(() => {
    const dummyquestions = [
      {
        id: 1,
        text: "What is your favorite color?",
      },
      {
        id: 2,
        text: "What is your favorite food?",
      },
      {
        id: 3,
        text: "What is your favorite movie?",
      },
    ];
    setQuestionnaire(dummyquestions);
  }
  , []);





  return (
    <div  className="text-white">
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
