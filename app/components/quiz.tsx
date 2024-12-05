"use client";

import { useEffect, useRef } from "react";

export default function Quiz({
  quiz,
}: {
  quizTitle: string;
  questions: string[];
}) {
  const { quizTitle, questions } = quiz;
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function handleOutsideClick(e: MouseEvent) {
    const dialog = dialogRef.current;
    if (dialog) {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog) {
      dialog.addEventListener("click", handleOutsideClick);
    }
    return () => {
      if (dialog)
        return dialog.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="w-fit p-2 ml-auto rounded-lg text-green-500 bg-white hover:bg-green-500 hover:text-white border hover:border-green-500 shadow-sm hover:shadow-md transition-all duration-300"
      >
        Start
      </button>
      <dialog
        ref={dialogRef}
        id="confirm-dialog"
        className="rounded-lg p-6 space-y-4 shadow-md"
      >
        <div>
          <h1>{quizTitle}</h1>
          {questions.map((questionObj, index) => (
            <div key={index}>
              <h2>{questionObj.question}</h2>
          

              {questionObj.options.map(option => {
               return (<label key={Math.random()}>
                <input type="radio" name="answer" value={questionObj.answerText}/>
                {option}
               </label>)
                
              })}
          
              <p>Answer: {questionObj.answer}</p>
              <p>Answer: {questionObj.answerText}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-evenly">
          <button
            type="button"
            className="w-fit p-2 rounded-lg text-red-500 bg-white hover:bg-red-500 hover:text-white border hover:border-red-500 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => dialogRef.current?.close()}
          >
            Delete
          </button>
          <button
            type="button"
            className="w-fit p-2 rounded-lg text-green-500 bg-white hover:bg-green-500 hover:text-white border hover:border-green-500 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => dialogRef.current?.close()}
          >
            Keep
          </button>
        </div>
      </dialog>
    </>
  );
}
