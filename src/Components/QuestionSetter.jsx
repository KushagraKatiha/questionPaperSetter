import React from 'react'
import { useState } from 'react'
import QuestionPaper from './QuestionPaper'


function QuestionSetter() {
  // Variables
  
  const [examName, setExamName] = useState('')
  const [programName, setProgramName] = useState('')
  const [semester, setSemester] = useState('')
  const [year, setYear] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [courseName, setCourseName] = useState('')
  const [shortQuestions, setShortQuestions] = useState([])
  const [longQuestions, setLongQuestions] = useState([])
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('choose');
  const [unit, setUnit] = useState('');
  const [bloomLevel, setBloomLevel] = useState('');
  const [co, setCo] = useState('');
  const [view, setView] = useState('hidden')
  

  // Functions
  const handleExamName = (e) => {
    setExamName(e.target.value)
  }

  const handleProgramName = (e) => {
    setProgramName(e.target.value)
  }

  const handleSemester = (e) => {
    setSemester(e.target.value)
  }

  const handleYear = (e) => {
    if(semester === '1' || semester === '2') {
      setYear('1st')
    }else if(semester === '3' || semester === '4') {
      setYear('2nd')
    }else if(semester === '5' || semester === '6') {
      setYear('3rd')
    }else if(semester === '7' || semester === '8') {
      setYear('4th')
    }
  }


  const handleCourseCode = (e) => {
    setCourseCode(e.target.value)
  }

  const handleCourseName = (e) => {
    setCourseName(e.target.value)
  }

  const handleAddQuestion = () => {
    if (shortQuestions.length < 8) {
      const marks = questionType === 'long' ? 10 : 2;
      const question = {
        text: questionText,
        maxMarks: marks,
        unit: unit,
        bloomLevel: bloomLevel,
        co: co,
      };
      questionType === 'long' ? setLongQuestions([...longQuestions, question]) : setShortQuestions([...shortQuestions, question]);
      setQuestionText('');
      setQuestionType('choose');
      setUnit('');
      setBloomLevel('');
      setCo('');
      alert(`${shortQuestions.length + 1} short questions and ${longQuestions.length + 1} long questions added`);
    } else {
      alert('You can only add 8 short questions and 4 long questions.');
    }
  };

  const handleDone = () => {
    document.getElementById('main_page').style.display = "none";
    setView('visible')
  }

  return (
    <>
      <div id='main_page'>
         <h1 className='text-center font-extrabold py-4 w-auto text-3xl'>Set Questions Page</h1>

         {/* Container to set exam details */}
         <div className='flex justify-around mt-5 bg-slate-950 py-6'>
            {/* Container to set exam name */}
            <div>
              <h2>Exam Name</h2>
              {/* Input to set exam name */}
              <input className='focus:outline-none px-2 bg-black text-white border-2 rounded-lg' 
              type="text" 
              placeholder='Enter exam name...'
              value={examName}
              onChange={handleExamName}
              />
            </div>

            {/* Container to set program name */}
            <div>
              <h2>Program Name</h2>
              {/* Input to set program name */}
              <input className='focus:outline-none px-2 bg-black text-white border-2 rounded-lg' 
              type="text" 
              placeholder='Enter program name...'
              value={programName}
              onChange={handleProgramName}
              />
            </div>

            {/* Container to set semester */}
            <div>
              <h2>Semester</h2>
              {/* Input to set semester */}
              <input className='focus:outline-none px-2 bg-black text-white border-2 rounded-lg' 
              type="text" 
              placeholder='Enter semester...'
              value={semester}
              onChange={handleSemester}
              />
            </div>
         </div>

         {/* Container to set other details */}
         <div className='flex justify-around bg-slate-950 py-6'>
          {/* Container to set course code */}
          <div>
            <h2>Course Code</h2>
            {/* Input to set course code */}
            <input className='focus:outline-none px-2 bg-black text-white border-2 rounded-lg' 
            type="text" 
            placeholder='Enter course code...'
            value={courseCode}
            onChange={handleCourseCode}
            />
          </div>

          {/* Container to set course name */}
          <div>
            <h2>Course Name</h2>
            {/* Input to set course name */}
            <input className='focus:outline-none px-2 bg-black text-white border-2 rounded-lg' 
            type="text" 
            placeholder='Enter course name...'
            value={courseName}
            onChange={handleCourseName}
            />
          </div>
         </div>       

         {/* Container to set Question Text */}
         <div className='flex justify-around items-center mt-10 gap-6 font-extrabold'>
  
            {/* Container to set question type */}
            <div className='bg-cyan-950 p-4 rounded-lg'> 
                <h2>Question Type</h2>
                {/* Dropdown to set question type */}
                <select className='text-white px-1 py-1 bg-black border-2 rounded-lg' id='qeType'>
                  <option value="choose">choose</option>
                  <option value="long">Long</option>
                  <option value="short">Short</option>
                </select>
            </div>
            

          <div className='text-center'>
            <h2>Question Text</h2>
            {/* Textarea to set question */}
            <textarea id='qeText' className='mt-3 border-2 rounded-lg bg-black text-white p-3 resize-none focus:outline-none' rows={10} cols={70} placeholder='Enter question...'/>

            {/* Container to put add and done buttons */}
          <div className='flex justify-between px-3'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-4' onClick={handleAddQuestion}>Add</button>

            <button className='bg-green-500 text-white px-4 py-2 rounded-lg mt-4 ml-4' onClick={handleDone}>Done</button>
          </div>
          </div>

            {/* Container to set other details */} 
            <div className='bg-cyan-950 p-4 rounded-lg'>
                {/* container to set unit */}
                <div>
                <h2>Unit</h2>
                {/* Dropdown to set unit */}
                <select id='qeUnit' className='text-white bg-black px-1 py-1 border-2 rounded-lg'>
                  <option value="-">-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                </div>

                {/* Container to set Bloom's Level */}
                <div> 
                <h2>Bloom's Level</h2>
                {/* Dropdown to set Bloom's Level */}
                <select id='qeBL' className='text-white bg-black px-1 py-1 border-2 rounded-lg'>
                  <option value="-">-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                </div>

                {/* Container to set Course Outcome */}
                <div>
                <h2>Course Outcome</h2>
                {/* Dropdown to set Course Outcome */}
                <select id='qeCO' className='text-white bg-black px-1 py-1 border-2 rounded-lg'>
                  <option value="-">-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                </div>
              </div>
         </div>
      </div>

      <QuestionPaper examName={examName} programName={programName} semester={semester} year={year} courseCode={courseCode} courseName={courseName} shortQuestions={shortQuestions} longQuestions={longQuestions} view={view}/>
    </>  
  )
}

export default QuestionSetter