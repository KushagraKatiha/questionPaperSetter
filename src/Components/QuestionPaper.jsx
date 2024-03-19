import React from "react";
import { useRef } from "react";

function QuestionPaper({
  examName,
  programName,
  academicSession,
  semester,
  year,
  courseCode,
  courseName,
  shortQuestions,
  longQuestions,
  view
}) {
      
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const handleDone = () => {
    window.location.reload();
  }

  return (
    <>

      <div
        id="questionPaper"
        className={`text-black mt-20 w-full h-full flex flex-col items-center justify-center mb-8 ${view}`}
      >
        <div className="px-24 bg-white h-5/6 w-9/12">
          {/* College Banner Container */}
          {/* College Banner */}
          <div className="bg-black mt-5">
            <img
              src="https://www.tmu.ac.in/monaco/assets/image/logo.png"
              alt="banner_img"
            />
          </div>

          {/* College Name, Exam Name, Program Name */}
          <div className="mt-4 text-black flex flex-col items-center">
            <h1 className="font-medium text-xl">
              College of Computing Sciences and Information Techonology
            </h1>

            <h2
              style={{ fontStyle: "italic" }}
              className="text-xl font-extrabold"
            >
              {examName}
            </h2>
            <h2>Program Name: {programName}</h2>
          </div>

          {/* Exam Details Table */}
          <div className="mt-4 text-black flex flex-col items-center">
            <table className="border-black border-2 w-4/5">
              <tbody>
                <tr className="border-black border-2">
                  <td className="px-3 border-black border-2">Year:{year}</td>
                  <td className="px-3 border-black border-2">
                    Semester:{semester}
                  </td>
                  <td className="px-3 border-black border-2">
                    Academic Session: {academicSession}
                  </td>
                </tr>
                <tr className="border-black border-2">
                  <td colSpan={2} className="px-3 border-black border-2">
                    Course Code: {courseCode}
                  </td>
                  <td className="px-3 border-black border-2">
                    Course Name: {courseName}
                  </td>
                </tr>
                <tr className="border-black border-2">
                  <td colSpan={2} className="px-3 border-black border-2">
                    Duradion: 90 minutes
                  </td>
                  <td className="px-3 border-black border-2">Max Marks: 30</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bloom Level Details */}
          <p className="text-xs font-bold text-black text-center">
            *Bloom Level{" "}
            {`{1-Remenbering, 2-Understanding, 3-Applying, 4-Analyzing, 5-Evaluating, 6-Creating}`}
          </p>

          {/* Question Paper */}
          <h1 className="mt-6 font-extrabold text-lg underline">
            Attempt All Questions.
          </h1>

          {/* Short Questions */}
          <div className="text-base font-bold flex justify-between">
            <h2>1. SHORT QUESTIONS</h2>
            <div className="flex gap-3 text-sm">
              <h2>Max Marks</h2>
              <h2>Unit</h2>
              <h2>Bloom Level*</h2>
              <h2>CO</h2>
            </div>
          </div>

          {/* Questions */}
          <div>
          <h2 className="font-semibold text-base underline mt-3 ml-6">Attemp any five question only.</h2>
            {shortQuestions.map((question, index) => {
              return (
                <div key={index} className="flex mt-4 ml-6">
                    <div className="flex gap-2 mr-2 w-full">
                      <span className="font-extrabold">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <p className="w-full">
                        {question.text}
                      </p>
                    </div>
                  <div className="flex gap-16 text-sm">
                    <p>({question.maxMarks})</p>
                    <p>{question.unit}</p>
                    <p>{question.bloomLevel}</p>
                    <p>{question.co}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Long Questions */}
          {longQuestions && longQuestions.length == 4 && (
            <>
            <div className="mt-6 ml-6 text-base font-bold">
              <h2>LONG QUESTIONS</h2>
            </div>

          {/* Questions */}
          <div>
            <div className="flex mt-4">
              <span className="font-extrabold">2.</span>
              <div className="w-full flex justify-between">
              <p className="flex">
                <span className="ml-2 font-extrabold">A. </span>{longQuestions[0].text}
              </p>
              <div className="flex gap-16 text-sm">
                <p>({longQuestions[0].maxMarks})</p>
                <p>{longQuestions[0].unit}</p>
                <p>{longQuestions[0].bloomLevel}</p>
                <p>{longQuestions[0].co}</p>
              </div>
              </div>
            </div>
          </div>
            <h1 className="text-center font-extrabold">OR</h1>
          <div>
            <div className="flex justify-between mt-4">
              <p className="flex">
                <span className="ml-4 font-extrabold">B. </span> {longQuestions[1].text}
              </p>
              <div className="flex gap-16 text-sm">
                <p>({longQuestions[1].maxMarks})</p>
                <p>{longQuestions[1].unit}</p>
                <p>{longQuestions[1].bloomLevel}</p>
                <p>{longQuestions[1].co}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex mt-4">
              <span className="font-extrabold">3.</span>
              <div className="w-full flex justify-between">
              <p className="flex">
                <span className="ml-2 font-extrabold">A. </span>{longQuestions[2].text}
              </p>
              <div className="flex gap-16 text-sm">
                <p>({longQuestions[2].maxMarks})</p>
                <p>{longQuestions[2].unit}</p>
                <p>{longQuestions[2].bloomLevel}</p>
                <p>{longQuestions[2].co}</p>
              </div>
              </div>
            </div>
          </div>
            <h1 className="text-center font-extrabold">OR</h1>
          <div>
            <div className="flex justify-between mt-4">
              <p className="flex">
                <span className="ml-4 font-extrabold">B. </span> {longQuestions[3].text}
              </p>
              <div className="flex gap-16 text-sm">
                <p>({longQuestions[3].maxMarks})</p>
                <p>{longQuestions[3].unit}</p>
                <p>{longQuestions[3].bloomLevel}</p>
                <p>{longQuestions[3].co}</p>
              </div>
            </div>
          </div>
          </>
          )}
          

          {/* Print Button */}
          <div className="flex justify-around mt-8 mb-5">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
              onClick={handlePrint}
            >
              Print
            </button>

            {/* Done Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 ml-4"
              onClick={handleDone}
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {/* Hidden container for printing */}
      <div ref={printRef} className="hidden">
        {/* College Banner Container */}
        {/* College Banner */}
        <div className="bg-black mt-5">
            <img
              src="https://www.tmu.ac.in/monaco/assets/image/logo.png"
              alt="banner_img"
            />
          </div>

          {/* College Name, Exam Name, Program Name */}
          <div className="mt-4 text-black flex flex-col items-center">
            <h1 className="font-medium text-xl">
              College of Computing Sciences and Information Techonology
            </h1>

            <h2
              style={{ fontStyle: "italic" }}
              className="text-xl font-extrabold"
            >
              {examName}
            </h2>
            <h2>Program Name: {programName}</h2>
          </div>

          {/* Exam Details Table */}
          <div className="mt-4 text-black flex flex-col items-center">
            <table className="border-black border-2 w-4/5">
              <tbody>
                <tr className="border-black border-2">
                  <td className="px-3 border-black border-2">Year:{year}</td>
                  <td className="px-3 border-black border-2">
                    Semester:{semester}
                  </td>
                  <td className="px-3 border-black border-2">
                    Academic Session: 2023-2024
                  </td>
                </tr>
                <tr className="border-black border-2">
                  <td colSpan={2} className="px-3 border-black border-2">
                    Course Code: {courseCode}
                  </td>
                  <td className="px-3 border-black border-2">
                    Course Name: {courseName}
                  </td>
                </tr>
                <tr className="border-black border-2">
                  <td colSpan={2} className="px-3 border-black border-2">
                    Duradion: 90 minutes
                  </td>
                  <td className="px-3 border-black border-2">Max Marks: 30</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bloom Level Details */}
          <p className="text-xs font-bold text-black text-center">
            *Bloom Level{" "}
            {`{1-Remenbering, 2-Understanding, 3-Applying, 4-Analyzing, 5-Evaluating, 6-Creating}`}
          </p>

          {/* Question Paper */}
          <h1 className="mt-6 font-extrabold text-lg underline">
            Attempt All Questions.
          </h1>

          {/* Short Questions */}
          <div className="text-base font-bold flex justify-between">
            <h2>1. SHORT QUESTIONS</h2>
            <div className="flex gap-3 text-sm">
              <h2>Max Marks</h2>
              <h2>Unit</h2>
              <h2>Bloom Level*</h2>
              <h2>CO</h2>
            </div>
          </div>

          {/* Questions */}
          <div>
          <h2 className="font-semibold text-base underline mt-3 ml-6">Attemp any five question only.</h2>
            {shortQuestions.map((question, index) => {
              return (
                <div key={index} className="flex mt-4 ml-6">
                    <div className="flex gap-2 mr-2 w-full">
                      <span className="font-extrabold">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <p className="w-full">
                        {question.text}
                      </p>
                    </div>
                  <div className="flex gap-16 text-sm">
                    <p>({question.maxMarks})</p>
                    <p>{question.unit}</p>
                    <p>{question.bloomLevel}</p>
                    <p>{question.co}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Long Questions */}
          {longQuestions && longQuestions.length == 4 && (
            <>
            <div className="mt-6 ml-6 text-base font-bold">
              <h2>LONG QUESTIONS</h2>
            </div>

          {/* Questions */}
          <div>
            <div className="flex mt-4">
              <span className="font-extrabold">8.</span>
              <div className="w-full flex justify-between">
              <p className="flex">
                <span className="ml-2 font-extrabold">A. </span>{longQuestions[0].text}
              </p>
              <div className="flex gap-16 text-sm">
                <p>({longQuestions[0].maxMarks})</p>
                <p>{longQuestions[0].unit}</p>
                <p>{longQuestions[0].bloomLevel}</p>
                <p>{longQuestions[0].co}</p>
              </div>
              </div>
            </div>
          </div>
            <h1 className="text-center font-extrabold">OR</h1>
          <div>
            <div className="flex justify-between mt-4">
              <p className="flex">
                <span className="ml-4 font-extrabold">B. </span> {longQuestions[1].text}
              </p>
              <div className="flex gap-16 text-sm">
                <p>({longQuestions[1].maxMarks})</p>
                <p>{longQuestions[1].unit}</p>
                <p>{longQuestions[1].bloomLevel}</p>
                <p>{longQuestions[1].co}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex mt-4">
              <span className="font-extrabold">3.</span>
              <div className="w-full flex justify-between">
              <p className="flex">
                <span className="ml-2 font-extrabold">A. </span>{longQuestions[2].text}
              </p>
              <div className="flex gap-16 text-sm">
                <p>({longQuestions[2].maxMarks})</p>
                <p>{longQuestions[2].unit}</p>
                <p>{longQuestions[2].bloomLevel}</p>
                <p>{longQuestions[2].co}</p>
              </div>
              </div>
            </div>
          </div>
            <h1 className="text-center font-extrabold">OR</h1>
          <div>
            <div className="flex justify-between mt-4">
              <p className="flex">
                <span className="ml-4 font-extrabold">B. </span> {longQuestions[3].text}
              </p>
              <div className="flex gap-16 text-sm">
                <p>({longQuestions[3].maxMarks})</p>
                <p>{longQuestions[3].unit}</p>
                <p>{longQuestions[3].bloomLevel}</p>
                <p>{longQuestions[3].co}</p>
              </div>
            </div>
          </div>
          </>
          )}
      </div>
    </>
  );
}

export default QuestionPaper;
