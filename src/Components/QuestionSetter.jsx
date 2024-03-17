import React, { useEffect } from 'react'
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

  const handleYear = () => {
    if(semester === 'I' || semester === 'II') {
      setYear('I')
    }else if(semester === 'III' || semester === 'IV') {
      setYear('II')
    }else if(semester === 'V' || semester === 'VI') {
      setYear('III')
    }else if(semester === 'VII' || semester === 'VIII') {
      setYear('IV')
    }
  }

  useEffect(() => {
    handleYear()
  }
  , [semester])


  const handleCourseCode = (e) => {
    setCourseCode(e.target.value)
  }

  const handleCourseName = (e) => {
    setCourseName(e.target.value)
  }

  const handleQuestionType = (e) => {
    setQuestionType(e.target.value)
  }

  const handleQuestionText = (e) => {
    setQuestionText(e.target.value)
  }

  const handleBloomLevel = (e) => {
    setBloomLevel(e.target.value)
  }

  const handleUnit = (e) => {
    setUnit(e.target.value)
  }

  const handleCo = (e) => {
    setCo(e.target.value)
  }

  const handleAddQuestion = () => {
    if (
      (questionType === 'short' && shortQuestions.length < 8) ||
      (questionType === 'long' && longQuestions.length < 4)
    ) {
      const marks = questionType === 'long' ? 10 : 2;
      const question = {
        text: questionText,
        maxMarks: marks,
        unit: unit,
        bloomLevel: bloomLevel,
        co: co,
      };
      if (questionType === 'long') {
        setLongQuestions((prevLongQuestions) => [...prevLongQuestions, question]);
        alert(`${longQuestions.length + 1} Long question added`);
      } else if (questionType === 'short') {
        setShortQuestions([...shortQuestions, question]);
        alert(`${shortQuestions.length + 1} Short question added`);
      }
      setQuestionText('');
      setQuestionType('choose');
      setUnit('');
      setBloomLevel('');
      setCo('');
    } else {
      alert('You can only add 8 short and 4 long questions');
    }
  };
  
  const handleDone = () => {
    if(shortQuestions.length === 8 && longQuestions.length === 4) {
      document.getElementById('main_page').style.display = "none";
      setView('visible')
    }else{
      alert('You have to add 8 short and 4 long questions')
    }
  }

  return (
    <>
      <div id='main_page' className='mb-4'>
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
              {/* Dropdown to set semester */}
              <select value={semester} onChange={handleSemester} className='text-white bg-black px-1 py-1 border-2 rounded-lg'>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
              </select>
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
                <select className='text-white px-1 py-1 bg-black border-2 rounded-lg' value={questionType} onChange={handleQuestionType}>
                  <option value="choose">choose</option>
                  <option value="long">Long</option>
                  <option value="short">Short</option>
                </select>
            </div>
            

          <div className='text-center'>
            <h2>Question Text</h2>
            {/* Textarea to set question */}
            <textarea value={questionText} onChange={handleQuestionText} className='mt-3 border-2 rounded-lg bg-black text-white p-3 resize-none focus:outline-none' rows={10} cols={70} placeholder='Enter question...'/>

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
                <select value={unit} onChange={handleUnit} className='text-white bg-black px-1 py-1 border-2 rounded-lg'>
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
                <select value={bloomLevel} onChange={handleBloomLevel} className='text-white bg-black px-1 py-1 border-2 rounded-lg'>
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
                <select value={co} onChange={handleCo} className='text-white bg-black px-1 py-1 border-2 rounded-lg'>
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