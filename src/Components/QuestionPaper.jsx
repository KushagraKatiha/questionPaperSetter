import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function QuestionPaper({}) {

  // Fetch the data from the local storage
  const examName = localStorage.getItem("examName").replace(/^"(.*)"$/, '$1');
  const selectedPrograms = JSON.parse(localStorage.getItem("selectedPrograms"));
  const otherProgram = localStorage.getItem("otherProgram").replace(/^"(.*)"$/, '$1');
  const year = localStorage.getItem("year").replace(/^"(.*)"$/, '$1');
  const semester = localStorage.getItem("semester").replace(/^"(.*)"$/, '$1');
  const courseCode = localStorage.getItem("courseCode").replace(/^"(.*)"$/, '$1');
  const courseName = localStorage.getItem("courseName").replace(/^"(.*)"$/, '$1');
  const shortQuestions = JSON.parse(localStorage.getItem("shortQuestions"));
  const longQuestions = JSON.parse(localStorage.getItem("longQuestions"));

  const navigate = useNavigate()

  useEffect(() => {
    // Check if the user accessed the page directly by manipulating the URL
    const isDirectAccess = window.history.state.idx === 0;
    if (isDirectAccess) {
      // Redirect the user to the home page
      alert("Cannot access the page directly. Redirecting to the home page...")
      navigate('/');
    }
  }, [navigate]);

  let academicSession;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 since getMonth() returns 0-based index

  if (currentMonth > 6) {
    academicSession = `${currentDate.getFullYear()}-${currentDate.getFullYear() + 1}`;
  } else {
    academicSession = `${currentDate.getFullYear() - 1}-${currentDate.getFullYear()}`;
  }

  const handleDone = () => {
    navigate('/')
  }

  const handleEdit = () => {
    navigate('/edit-page')
  }

  const handlePrint = () => {
    const printContent = document.getElementById("printContent").innerHTML;
    const originalContent = document.body.innerHTML;

    // Display the hidden div
    document.getElementById("printContent").style.display = "block";

    // Replace the current content of the body with the content to be printed
    document.body.innerHTML = printContent;

    // Print the content
    window.print();

    // Restore the original content after printing
    document.body.innerHTML = originalContent;

    // Hide the hidden div again
    document.getElementById("printContent").style.display = "none";
  };

  return (
    <>
      <div style={{ backgroundImage: 'linear-gradient(to right, #f4e7ff, #a77ed6)' }}
        id="questionPaper"
        className={`text-black mt-20 w-full h-full flex flex-col items-center justify-center mb-8 `}
      >
        <div className="px-12 bg-white h-5/6 w-1/2">
          {/* College Banner Container */}
          {/* College Banner */}
          <div className="bg-black mt-5">
            <img src="https://iili.io/JXj3wq7.md.jpg" alt="clockTower" className="w-full h-[100px]" />
          </div>

          {/* College Name, Exam Name, Program Name */}
          <div className="mt-4 text-black flex flex-col items-center justify-center">
            <h1 className="font-bold text-base text-center">
              College of Computing Sciences and Information Technology
            </h1>

            <h2
              style={{ fontStyle: "italic" }}
              className="text-base font-extrabold"
            >
              {examName.toUpperCase()}
            </h2>
            <h2 className="text-xs">Program Name: {selectedPrograms.toString().split(',').join('/')}{otherProgram ? "/" : " "}{otherProgram.toUpperCase()}</h2>
          </div>

          {/* Exam Details Table */}
          <div className="mt-1 text-black flex flex-col items-center text-xs">
            <table className="border-black border-2 w-4/5">
              <tbody>
                <tr className="border-black border-2">
                  <td className="px-2 border-black border-2">Year:{year}</td>
                  <td className="px-2 border-black border-2">
                    Semester:{semester}
                  </td>
                  <td className="px-2 border-black border-2">
                    Academic Session: {academicSession}
                  </td>
                </tr>
                <tr className="border-black border-2">
                  <td colSpan={2} className="px-2 border-black border-2">
                    Course Code: {courseCode.toString().toUpperCase()}
                  </td>
                  <td className="px-2 border-black border-2">
                    Course Name: {courseName.toUpperCase()}
                  </td>
                </tr>
                <tr className="border-black border-2">
                  <td colSpan={2} className="px-2 border-black border-2">
                    Duration: 90 minutes
                  </td>
                  <td className="px-2 border-black border-2">Max Marks: 30</td>
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
          <h1 className="mt-4 mb-2 font-extrabold text-sm underline">
            Attempt All Questions.
          </h1>

          {/* Short Questions */}
          <div className="text-sm font-bold flex justify-between">
            <h2>1. SHORT QUESTIONS</h2>
            <div className="flex gap-3 text-sm">
              <h2>MM</h2>
              <h2>Unit</h2>
              <h2>BTL</h2>
              <h2>CO</h2>
            </div>
          </div>

          {/* Questions */}
          <div>
            <h2 className="font-medium text-sm underline mb-1 mt-2 ml-4">Attemp any five question only.</h2>
            {shortQuestions.map((question, index) => {
              return (
                <div key={index} className="ml-4 flex justify-between gap-5 items-center mb-3">
                  <div className="flex flex-col">
                    <div className="flex gap-1">
                      <span className="font-medium text-xs">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: question.ques }}></div>
                    </div>
                    {question.image && (
                      <div className="ml-4 w-1/2">
                        <img src={question.image} className="h-[150px]" alt="Question Image" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-7 mr-3 text-xs">
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
              <div className="mt-6 ml-6 text-sm font-bold">
                <h2>LONG QUESTIONS</h2>
              </div>
              {/* Questions */}
              {/* Question 1 */}
              <div>
                <div className="flex mt-1">
                  <span className="font-bold text-sm">2.</span>
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[0].subQuestion1 && longQuestions[0].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-2 font-medium text-sm mr-1">A. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[0].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[0].subQuestion1.image && (
                            <div className="ml-6 w-1/2">
                              <img src={longQuestions[0].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[0].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[0].subQuestion1.unit}</p>
                          <p>{longQuestions[0].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[0].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-8 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[0].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[0].subQuestion2.image && (
                            <div className="ml-6 w-1/2">
                              <img src={longQuestions[0].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[0].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[0].subQuestion2.unit}</p>
                          <p>{longQuestions[0].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[0].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-2 font-medium text-sm mr-1">A. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[0].ques }}></div>
                        </div>
                        {longQuestions[0].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[0].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[0].maxMarks})</p>
                        <p>{longQuestions[0].unit}</p>
                        <p>{longQuestions[0].bloomLevel}</p>
                        <p>{longQuestions[0].co}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <h1 className="text-center font-semibold text-base">OR</h1>
              {/* Question 2 */}
              <div className="flex mt-1">
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[1].subQuestion1 && longQuestions[1].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-5 font-medium text-sm mr-1">B. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[1].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[1].subQuestion1.image && (
                            <div className="ml-6 w-1/2">
                              <img src={longQuestions[1].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[1].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[1].subQuestion1.unit}</p>
                          <p>{longQuestions[1].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[1].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-11 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[1].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[1].subQuestion2.image && (
                            <div className="ml-6 w-1/2">
                              <img src={longQuestions[1].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[1].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[1].subQuestion2.unit}</p>
                          <p>{longQuestions[1].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[1].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-2 font-medium text-sm mr-1">B. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[1].ques }}></div>
                        </div>
                        {longQuestions[1].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[1].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[1].maxMarks})</p>
                        <p>{longQuestions[1].unit}</p>
                        <p>{longQuestions[1].bloomLevel}</p>
                        <p>{longQuestions[1].co}</p>
                      </div>
                    </div>
                  )}
                </div>
              {/* Question 3 */}
              <div className="flex mt-5">
                  <span className="font-bold text-sm">3.</span>
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[2].subQuestion1 && longQuestions[2].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-2 font-medium text-sm mr-1">A. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[2].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[2].subQuestion1.image && (
                            <div className="ml-6 w-1/2">
                              <img src={longQuestions[2].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[2].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[2].subQuestion1.unit}</p>
                          <p>{longQuestions[2].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[2].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-8 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[2].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[2].subQuestion2.image && (
                            <div className="ml-6 w-1/2">
                              <img src={longQuestions[2].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[2].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[2].subQuestion2.unit}</p>
                          <p>{longQuestions[2].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[2].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-2 font-medium text-sm mr-1">A. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[2].ques }}></div>
                        </div>
                        {longQuestions[2].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[2].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[2].maxMarks})</p>
                        <p>{longQuestions[2].unit}</p>
                        <p>{longQuestions[2].bloomLevel}</p>
                        <p>{longQuestions[2].co}</p>
                      </div>
                    </div>
                  )}
                </div>
              <h1 className="text-center font-semibold text-base">OR</h1>

              {/* Question 4 */}
              <div className="flex mt-1">
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[3].subQuestion1 && longQuestions[3].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-5 font-medium text-sm mr-1">B. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[3].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[3].subQuestion1.image && (
                            <div className="ml-6 w-1/2">
                              <img src={longQuestions[3].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[3].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[3].subQuestion1.unit}</p>
                          <p>{longQuestions[3].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[3].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-11 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[3].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[3].subQuestion2.image && (
                            <div className="ml-6 w-1/2">
                              <img src={longQuestions[3].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[3].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[3].subQuestion2.unit}</p>
                          <p>{longQuestions[3].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[3].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-5 font-medium text-sm mr-1">B. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[3].ques }}></div>
                        </div>
                        {longQuestions[3].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[3].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[3].maxMarks})</p>
                        <p>{longQuestions[3].unit}</p>
                        <p>{longQuestions[3].bloomLevel}</p>
                        <p>{longQuestions[3].co}</p>
                      </div>
                    </div>
                  )}
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

             {/* Edit Button */}
             <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 ml-4"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <div id="printContent" className="hidden">
        {/* Add your content here that you want to print */}
        <div className="flex">
        <div className="px-12 bg-white h-5/6 w-full">
          {/* College Banner Container */}
          {/* College Banner */}
          <div className="bg-black mt-5">
            <img src="https://iili.io/JXj3wq7.md.jpg" alt="clockTower" className="w-full h-[100px]" />
          </div>

          {/* College Name, Exam Name, Program Name */}
          <div className="mt-4 text-black flex flex-col items-center justify-center">
            <h1 className="font-bold text-base text-center">
              College of Computing Sciences and Information Technology
            </h1>

            <h2
              style={{ fontStyle: "italic" }}
              className="text-base font-extrabold"
            >
              {examName.toUpperCase()}
            </h2>
            <h2 className="text-xs">Program Name: {selectedPrograms.toString().split(',').join('/')}{otherProgram ? "/" : " "}{otherProgram.toUpperCase()}</h2>
          </div>

          {/* Exam Details Table */}
          <div className="mt-1 text-black flex flex-col items-center text-xs">
            <table className="border-black border-2 w-4/5">
              <tbody>
                <tr className="border-black border-2">
                  <td className="px-2 border-black border-2">Year:{year}</td>
                  <td className="px-2 border-black border-2">
                    Semester:{semester}
                  </td>
                  <td className="px-2 border-black border-2">
                    Academic Session: {academicSession}
                  </td>
                </tr>
                <tr className="border-black border-2">
                  <td colSpan={2} className="px-2 border-black border-2">
                    Course Code: {courseCode.toString().toUpperCase()}
                  </td>
                  <td className="px-2 border-black border-2">
                    Course Name: {courseName.toUpperCase()}
                  </td>
                </tr>
                <tr className="border-black border-2">
                  <td colSpan={2} className="px-2 border-black border-2">
                    Duration: 90 minutes
                  </td>
                  <td className="px-2 border-black border-2">Max Marks: 30</td>
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
          <h1 className="mt-4 mb-2 font-extrabold text-sm underline">
            Attempt All Questions.
          </h1>

          {/* Short Questions */}
          <div className="text-sm font-bold flex justify-between">
            <h2>1. SHORT QUESTIONS</h2>
            <div className="flex gap-3 text-sm">
              <h2>MM</h2>
              <h2>Unit</h2>
              <h2>BTL</h2>
              <h2>CO</h2>
            </div>
          </div>

          {/* Questions */}
          <div>
            <h2 className="font-medium text-sm underline mb-1 mt-2 ml-4">Attemp any five question only.</h2>
            {shortQuestions.map((question, index) => {
              return (
                <div key={index} className="ml-4 flex justify-between gap-5 items-center mb-3">
                  <div className="flex flex-col">
                    <div className="flex gap-1">
                      <span className="font-medium text-xs">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: question.ques }}></div>
                    </div>
                    {question.image && (
                      <div className="ml-4 w-1/2">
                        <img src={question.image} className="h-[150px]" alt="Question Image" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-7 mr-3 text-xs">
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
              <div className="mt-6 ml-6 text-sm font-bold">
                <h2>LONG QUESTIONS</h2>
              </div>
              {/* Questions */}
              {/* Question 1 */}
              <div>
                <div className="flex mt-1">
                  <span className="font-bold text-sm">2.</span>
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[0].subQuestion1 && longQuestions[0].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-2 font-medium text-sm mr-1">A. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[0].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[0].subQuestion1.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[0].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[0].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[0].subQuestion1.unit}</p>
                          <p>{longQuestions[0].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[0].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-8 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[0].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[0].subQuestion2.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[0].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[0].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[0].subQuestion2.unit}</p>
                          <p>{longQuestions[0].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[0].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-2 font-medium text-sm mr-1">A. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[0].ques }}></div>
                        </div>
                        {longQuestions[0].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[0].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[0].maxMarks})</p>
                        <p>{longQuestions[0].unit}</p>
                        <p>{longQuestions[0].bloomLevel}</p>
                        <p>{longQuestions[0].co}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <h1 className="text-center font-semibold text-base">OR</h1>
              {/* Question 2 */}
              <div className="flex mt-1">
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[1].subQuestion1 && longQuestions[1].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-5 font-medium text-sm mr-1">B. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[1].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[1].subQuestion1.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[1].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[1].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[1].subQuestion1.unit}</p>
                          <p>{longQuestions[1].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[1].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-11 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[1].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[1].subQuestion2.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[1].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[1].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[1].subQuestion2.unit}</p>
                          <p>{longQuestions[1].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[1].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-2 font-medium text-sm mr-1">B. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[1].ques }}></div>
                        </div>
                        {longQuestions[1].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[1].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[1].maxMarks})</p>
                        <p>{longQuestions[1].unit}</p>
                        <p>{longQuestions[1].bloomLevel}</p>
                        <p>{longQuestions[1].co}</p>
                      </div>
                    </div>
                  )}
                </div>
              {/* Question 3 */}
              <div className="flex mt-5">
                  <span className="font-bold text-sm">3.</span>
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[2].subQuestion1 && longQuestions[2].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-2 font-medium text-sm mr-1">A. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[2].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[2].subQuestion1.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[2].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[2].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[2].subQuestion1.unit}</p>
                          <p>{longQuestions[2].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[2].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-8 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[2].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[2].subQuestion2.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[2].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[2].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[2].subQuestion2.unit}</p>
                          <p>{longQuestions[2].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[2].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-2 font-medium text-sm mr-1">A. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[2].ques }}></div>
                        </div>
                        {longQuestions[2].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[2].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[2].maxMarks})</p>
                        <p>{longQuestions[2].unit}</p>
                        <p>{longQuestions[2].bloomLevel}</p>
                        <p>{longQuestions[2].co}</p>
                      </div>
                    </div>
                  )}
                </div>
              <h1 className="text-center font-semibold text-base">OR</h1>

              {/* Question 4 */}
              <div className="flex mt-1">
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[3].subQuestion1 && longQuestions[3].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-5 font-medium text-sm mr-1">B. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[3].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[3].subQuestion1.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[3].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[3].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[3].subQuestion1.unit}</p>
                          <p>{longQuestions[3].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[3].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-11 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[3].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[3].subQuestion2.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[3].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[3].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[3].subQuestion2.unit}</p>
                          <p>{longQuestions[3].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[3].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-5 font-medium text-sm mr-1">B. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[3].ques }}></div>
                        </div>
                        {longQuestions[3].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[3].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[3].maxMarks})</p>
                        <p>{longQuestions[3].unit}</p>
                        <p>{longQuestions[3].bloomLevel}</p>
                        <p>{longQuestions[3].co}</p>
                      </div>
                    </div>
                  )}
                </div>
            </>
          )}
        </div>
        <div className="px-12 bg-white h-5/6 w-full">
          {/* College Banner Container */}
          {/* College Banner */}
          <div className="bg-black mt-5">
            <img src="https://iili.io/JXj3wq7.md.jpg" alt="clockTower" className="w-full h-[100px]" />
          </div>

          {/* College Name, Exam Name, Program Name */}
          <div className="mt-4 text-black flex flex-col items-center justify-center">
            <h1 className="font-bold text-base text-center">
              College of Computing Sciences and Information Technology
            </h1>

            <h2
              style={{ fontStyle: "italic" }}
              className="text-base font-extrabold"
            >
              {examName.toUpperCase()}
            </h2>
            <h2 className="text-xs">Program Name: {selectedPrograms.toString().split(',').join('/')}{otherProgram ? "/" : " "}{otherProgram.toUpperCase()}</h2>
          </div>

          {/* Exam Details Table */}
          <div className="mt-1 text-black flex flex-col items-center text-xs">
            <table className="border-black border-2 w-4/5">
              <tbody>
                <tr className="border-black border-2">
                  <td className="px-2 border-black border-2">Year:{year}</td>
                  <td className="px-2 border-black border-2">
                    Semester:{semester}
                  </td>
                  <td className="px-2 border-black border-2">
                    Academic Session: {academicSession}
                  </td>
                </tr>
                <tr className="border-black border-2">
                  <td colSpan={2} className="px-2 border-black border-2">
                    Course Code: {courseCode.toString().toUpperCase()}
                  </td>
                  <td className="px-2 border-black border-2">
                    Course Name: {courseName.toUpperCase()}
                  </td>
                </tr>
                <tr className="border-black border-2">
                  <td colSpan={2} className="px-2 border-black border-2">
                    Duration: 90 minutes
                  </td>
                  <td className="px-2 border-black border-2">Max Marks: 30</td>
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
          <h1 className="mt-4 mb-2 font-extrabold text-sm underline">
            Attempt All Questions.
          </h1>

          {/* Short Questions */}
          <div className="text-sm font-bold flex justify-between">
            <h2>1. SHORT QUESTIONS</h2>
            <div className="flex gap-3 text-sm">
              <h2>MM</h2>
              <h2>Unit</h2>
              <h2>BTL</h2>
              <h2>CO</h2>
            </div>
          </div>

          {/* Questions */}
          <div>
            <h2 className="font-medium text-sm underline mb-1 mt-2 ml-4">Attemp any five question only.</h2>
            {shortQuestions.map((question, index) => {
              return (
                <div key={index} className="ml-4 flex justify-between gap-5 items-center mb-3">
                  <div className="flex flex-col">
                    <div className="flex gap-1">
                      <span className="font-medium text-xs">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: question.ques }}></div>
                    </div>
                    {question.image && (
                      <div className="ml-4 w-1/2">
                        <img src={question.image} className="h-[150px]" alt="Question Image" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-7 mr-3 text-xs">
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
              <div className="mt-6 ml-6 text-sm font-bold">
                <h2>LONG QUESTIONS</h2>
              </div>
              {/* Questions */}
              {/* Question 1 */}
              <div>
                <div className="flex mt-1">
                  <span className="font-bold text-sm">2.</span>
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[0].subQuestion1 && longQuestions[0].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-2 font-medium text-sm mr-1">A. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[0].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[0].subQuestion1.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[0].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[0].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[0].subQuestion1.unit}</p>
                          <p>{longQuestions[0].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[0].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-8 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[0].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[0].subQuestion2.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[0].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[0].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[0].subQuestion2.unit}</p>
                          <p>{longQuestions[0].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[0].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-2 font-medium text-sm mr-1">A. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[0].ques }}></div>
                        </div>
                        {longQuestions[0].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[0].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[0].maxMarks})</p>
                        <p>{longQuestions[0].unit}</p>
                        <p>{longQuestions[0].bloomLevel}</p>
                        <p>{longQuestions[0].co}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <h1 className="text-center font-semibold text-base">OR</h1>
              {/* Question 2 */}
              <div className="flex mt-1">
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[1].subQuestion1 && longQuestions[1].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-5 font-medium text-sm mr-1">B. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[1].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[1].subQuestion1.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[1].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[1].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[1].subQuestion1.unit}</p>
                          <p>{longQuestions[1].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[1].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-11 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[1].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[1].subQuestion2.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[1].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[1].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[1].subQuestion2.unit}</p>
                          <p>{longQuestions[1].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[1].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-2 font-medium text-sm mr-1">B. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[1].ques }}></div>
                        </div>
                        {longQuestions[1].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[1].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[1].maxMarks})</p>
                        <p>{longQuestions[1].unit}</p>
                        <p>{longQuestions[1].bloomLevel}</p>
                        <p>{longQuestions[1].co}</p>
                      </div>
                    </div>
                  )}
                </div>
              {/* Question 3 */}
              <div className="flex mt-5">
                  <span className="font-bold text-sm">3.</span>
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[2].subQuestion1 && longQuestions[2].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-2 font-medium text-sm mr-1">A. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[2].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[2].subQuestion1.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[2].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[2].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[2].subQuestion1.unit}</p>
                          <p>{longQuestions[2].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[2].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-8 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[2].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[2].subQuestion2.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[2].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[2].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[2].subQuestion2.unit}</p>
                          <p>{longQuestions[2].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[2].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-2 font-medium text-sm mr-1">A. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[2].ques }}></div>
                        </div>
                        {longQuestions[2].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[2].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[2].maxMarks})</p>
                        <p>{longQuestions[2].unit}</p>
                        <p>{longQuestions[2].bloomLevel}</p>
                        <p>{longQuestions[2].co}</p>
                      </div>
                    </div>
                  )}
                </div>
              <h1 className="text-center font-semibold text-base">OR</h1>

              {/* Question 4 */}
              <div className="flex mt-1">
                  {/* If long question have a object have two more objects inside it */}
                  {longQuestions[3].subQuestion1 && longQuestions[3].subQuestion2 ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-5 font-medium text-sm mr-1">B. </span><span className="ml-2 font-medium text-sm mr-1">a.</span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[3].subQuestion1.ques }}></div>
                          </div>
                          {longQuestions[3].subQuestion1.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[3].subQuestion1.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[3].subQuestion1.maxMarks})</p>
                          <p>{longQuestions[3].subQuestion1.unit}</p>
                          <p>{longQuestions[3].subQuestion1.bloomLevel}</p>
                          <p>{longQuestions[3].subQuestion1.co}</p>
                        </div>
                      </div>

                      {/* Subquestion 2 */}
                      <div className="w-full flex gap-5 justify-between">
                        <div className="flex flex-col">
                          <div className="flex text-xs ">
                            <span className="ml-11 font-medium text-sm mr-1">b. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[3].subQuestion2.ques }}></div>
                          </div>
                          {longQuestions[3].subQuestion2.image && (
                            <div className="ml-16 w-1/2">
                              <img src={longQuestions[3].subQuestion2.image} alt="Question Image" />
                            </div>
                          )}

                        </div>
                        <div className="flex gap-7 mr-3 text-xs">
                          <p>({longQuestions[3].subQuestion2.maxMarks})</p>
                          <p>{longQuestions[3].subQuestion2.unit}</p>
                          <p>{longQuestions[3].subQuestion2.bloomLevel}</p>
                          <p>{longQuestions[3].subQuestion2.co}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex gap-3 justify-between">
                      <div className="flex flex-col">
                        <div className="flex text-xs ">
                          <span className="ml-5 font-medium text-sm mr-1">B. </span><div className="text-xs text-justify" dangerouslySetInnerHTML={{ __html: longQuestions[3].ques }}></div>
                        </div>
                        {longQuestions[3].image && (
                          <div className="ml-6 w-1/2">
                            <img src={longQuestions[3].image} alt="Question Image" />
                          </div>
                        )}

                      </div>
                      <div className="flex gap-7 mr-3 text-xs">
                        <p>({longQuestions[3].maxMarks})</p>
                        <p>{longQuestions[3].unit}</p>
                        <p>{longQuestions[3].bloomLevel}</p>
                        <p>{longQuestions[3].co}</p>
                      </div>
                    </div>
                  )}
                </div>
            </>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

export default QuestionPaper;
