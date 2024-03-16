import React from 'react'

function QuestionPaper({ examName, programName, semester, year, courseCode, courseName, shortQuestions}) {

    const handlePrint = () => {
        window.print();
      };
    
      const handleClose = () => {
        document.getElementById('questionPaper').style.display = 'none';
      };

  return (
    <>
        {/* Question Paper Card */}
      {/* Main Container */}
      <div id='questionPaper' className='text-black mt-20 w-full bg-blue-600 flex flex-col items-center'>
        <div className='px-6 bg-white w-9/12'>
        <button className='relative top-0 left-1/2 text-xl text-red-900' onClick={handleClose}>×</button>
          {/* College Banner Container */}
          {/* College Banner */}
          <div className='bg-black'>
          <img src="https://www.tmu.ac.in/monaco/assets/image/logo.png" alt="banner_img"/>
          </div>

          {/* College Name, Exam Name, Program Name */}
          <div className='mt-4 text-black flex flex-col items-center'>
            <h1 className='font-medium text-xl'>College of Computing Sciences and Information Techonology</h1>

            <h2 style={{ fontStyle: 'italic' }} className='text-xl font-extrabold'>Exam: {examName}</h2>
            <h2>Program Name: {programName}</h2>
          </div>

        {/* Exam Details Table */}
        <div className='mt-4 text-black flex flex-col items-center'>
          <table className='border-black border-2'>
            <tbody>
              <tr className='border-black border-2'>
                <td className='px-3 border-black border-2'>Year:{year}</td>
                <td className='px-3 border-black border-2'>Semester:{semester}</td>
                <td className='px-3 border-black border-2'>Academic Session: 2023-2024</td>
              </tr>
              <tr className='border-black border-2'>
                <td colSpan={2} className='px-3 border-black border-2'>Course Code: {courseCode}</td>
                <td className='px-3 border-black border-2'>Course Name: {courseName}</td>
              </tr>
                <tr className='border-black border-2'>
                  <td colSpan={2} className='px-3 border-black border-2'>Duradion: 90 minutes</td>
                  <td className='px-3 border-black border-2'>Max Marks: 30</td>
                </tr>
              </tbody>    
          </table>
        </div>

        {/* Bloom Level Details */}
        <p className='text-xs text-black text-center'>*Bloom Level {`{1-Remenbering, 2-Understanding, 3-Applying, 4-Analyzing, 5-Evaluating, 6-Creating}`}</p>

        {/* Question Paper */}
        <h1 className='mt-6 font-extrabold text-lg underline'>Attempt All Questions.</h1>
        
        {/* Short Questions */}
        <div className='text-base font-bold flex justify-between'>
            <h2>1. SHORT QUESTIONS</h2>
            <div className='flex gap-3 text-sm'>
                <h2>Max Marks</h2>
                <h2>Unit</h2>
                <h2>Bloom Level*</h2>
                <h2>CO</h2>
            </div>
        </div>

        {/* Questions */}
        <div>
            {shortQuestions.map((question, index) => {
                return (
                    <div key={index} className='flex justify-between mt-4'>
                        <p className='text-wrap w-1/2'>{index + 1}. {question.text}</p>
                        <div className='flex gap-16 text-sm'>
                            <p>{question.maxMarks}</p>
                            <p>{question.unit}</p>
                            <p>{question.bloomLevel}</p>
                            <p>{question.co}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        {/* Print Button */}
        <button className='bg-green-500 text-white px-4 py-2 rounded-lg mt-4' onClick={handlePrint}>Print</button>
        </div>    
      </div>
    </>
  )
}

export default QuestionPaper