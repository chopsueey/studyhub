export default function Quiz({quiz}: { quizTitle: string; questions: string[]}) {
  const {quizTitle, questions} = quiz;
  
  return (
    <div>
      <h1>{quizTitle}</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <h2>{question.question}</h2>
          <p>{question.answer}</p>
        </div>
      ))}
    </div>
  );
}
