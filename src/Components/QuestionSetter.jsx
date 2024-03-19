import React, { useEffect } from 'react'
import { useState } from 'react'
import QuestionPaper from './QuestionPaper'

function QuestionSetter() {
  // Variables

  const [examName, setExamName] = useState('')
  const [programName, setProgramName] = useState('')
  const [academicSession, setAcademicSession] = useState('')
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
  const [view, setView] = useState('visible')

  // Functions
  const handleExamName = (e) => {
    setExamName(e.target.value)
  }

  const handleProgramName = (e) => {
    setProgramName(e.target.value)
  }

  const handleAcademicSession = (e) => {
    setAcademicSession(e.target.value)
  }

  const handleSemester = (e) => {
    setSemester(e.target.value)
  }

  const handleYear = () => {
    if (semester === 'I' || semester === 'II') {
      setYear('I')
    } else if (semester === 'III' || semester === 'IV') {
      setYear('II')
    } else if (semester === 'V' || semester === 'VI') {
      setYear('III')
    } else if (semester === 'VII' || semester === 'VIII') {
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
    if (shortQuestions.length === 8 && longQuestions.length === 4) {
      document.getElementById('main_page').style.display = "none";
      setView('visible')
    } else {
      alert('You have to add 8 short and 4 long questions')
    }
  }

  return (
    <>
      <div id='main_page' className='mb-4'>
        {/* Container for heading and banner */}
        <div className='bg-gradient-to-r from-orange-500 to-orange-700 flex justify-center items-center py-5'>
          <h1 className='text-center font-extrabold py-4 w-auto text-5xl'>THE EXAM SETTER</h1>
          <img src="https://www.tmu.ac.in/monaco/assets/image/logo.png" alt="banner_img" />
        </div>

        <hr className='border-2 border-black' />

        {/* Container for upper part */}
        <div className='flex justify-evenly mt-7 items-center py-10'>
          {/* container for exam and program */}
          <div className='flex flex-col gap-10'>
            <div>
              <h2 className='font-bold text-lg'>Exam Name</h2>
              {/* Input to set exam name */}
              <input className='border-2 border-[#9c36b5] h-10 focus:outline-none px-2 bg-black text-white rounded-lg'
                type="text"
                placeholder='Enter exam name...'
                value={examName}
                onChange={handleExamName}
              />
            </div>

            {/* Container to set program name */}
            <div>
              <h2 className='font-bold text-lg'>Program Name</h2>
              {/* Input to set program name */}
              <input className='border-2 border-[#9c36b5] h-10 focus:outline-none px-2 bg-black text-white rounded-lg'
                type="text"
                placeholder='Enter program name...'
                value={programName}
                onChange={handleProgramName}
              />
            </div>

            {/* Container to set Academic Session */}
            <div>
              <h2 className='font-bold text-lg'>Academic Session</h2>
              {/* Input to set academic session */}
              <input className='border-2 border-[#9c36b5] h-10 focus:outline-none px-2 bg-black text-white rounded-lg'
                type="text"
                placeholder='Enter Academic session...'
                value={academicSession}
                onChange={handleAcademicSession}
              />
            </div>
          </div>

          {/* container for course name course code and semester */}
          <div className='flex flex-col gap-10'>           
              <div>
                <h2 className='font-bold text-lg'>Course Name</h2>
                {/* Input to set course name */}
                <input className='border-2 border-[#9c36b5] h-10 focus:outline-none px-2 bg-black text-white rounded-lg'
                  type="text"
                  placeholder='Enter course name...'
                  value={courseName}
                  onChange={handleCourseName}
                />
              </div>

              <div className='flex'>
                <div className='w-1/2'>
                  <h2 className='font-bold text-lg'>Course Code</h2>
                  {/* Input to set course code */}
                  <input className='border-2 border-[#9c36b5] h-10 focus:outline-none px-2 bg-black text-white rounded-lg w-11/12'
                    type="text"
                    placeholder='Enter course code...'
                    value={courseCode}
                    onChange={handleCourseCode}
                  />
                </div>

                  <div className='ml-1 flex flex-col'>
                    <h2 className='font-bold text-lg'>Semester</h2>
                  {/* Dropdown to set semester */}
                    <select value={semester} onChange={handleSemester} className='border-2 border-[#9c36b5] h-10 text-white bg-black px-1 py-1 rounded-lg'>
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
      
          </div>

          {/* container for image */}
          <div className='w-1/3 shadow-black shadow-2xl '>
            <img src="https://github.com/KushagraKatiha/examSetterImages/blob/main/clockTower.jpg" alt="clock_tower" className='rounded-lg' />
          </div>
        </div>

        {/* Container to set Question Text */}
        <div className='flex justify-between ml-11 items-end mt-12 gap-6 font-extrabold pb-7'>
          {/* Container for other details */}

          <div className='flex flex-col gap-5 h-full'>
          {/* Container to set question type */}
            <div className='bg-black p-2 rounded-lg border-2 border-[#9c36b5]'>
              <h2 className='font-bold text-white text-base'>Question Type</h2>
              {/* Dropdown to set question type */}
              <select className='focus:outline-none h-8 text-white px-1 py-1 bg-black border-[#9c36b5] border-2 rounded-lg' value={questionType} onChange={handleQuestionType}>
                <option value="choose">choose</option>
                <option value="long">Long</option>
                <option value="short">Short</option>
              </select>
            </div>

            {/* Container to set sub details */}
            <div className='bg-black border-2 border-[#9c36b5] p-4 rounded-lg'>
              {/* container to set unit */}
              <div>
                <h2 className='font-bold text-base text-white'>Unit</h2>
                {/* Dropdown to set unit */}
                <select value={unit} onChange={handleUnit} className='focus:outline-none h-8 text-white bg-black px-1 py-1 border-2 border-[#9c36b5] rounded-lg'>
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
                <h2 className='font-bold text-base text-white'>Bloom's Level</h2>
                {/* Dropdown to set Bloom's Level */}
                <select value={bloomLevel} onChange={handleBloomLevel} className='focus:outline-none h-8 text-white bg-black px-1 py-1 border-2 border-[#9c36b5] rounded-lg'>
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
                <h2 className='font-bold text-base text-white'>Course Outcome</h2>
                {/* Dropdown to set Course Outcome */}
                <select value={co} onChange={handleCo} className='focus:outline-none h-8 text-white bg-black px-1 py-1 border-2 border-[#9c36b5] rounded-lg'>
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

          <div className='text-center'>
            <h2 className='font-bold text-xl'>Question Text</h2>
            {/* Textarea to set question */}
            <textarea value={questionText} onChange={handleQuestionText} className='mt-3 border-2 border-[#9c36b5] rounded-lg bg-black text-white p-3 resize-none focus:outline-none' rows={8} cols={50} placeholder='Enter question...' />

            {/* Container to put add and done buttons */}
            <div className='flex'>
              <button className='bg-black border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleAddQuestion}>Add</button>

              <button className='bg-black border-2 border-[#ff0000] text-[#523bff] px-4 py-2 rounded-lg mt-4 ml-4' onClick={handleDone}>Done</button>
            </div>
          </div>

          {/* Container for Credentials */}
          <div className='h-full flex gap-3 items-center mr-4'>
            <div className=''>
              <img src="https://www.tmu.ac.in/img/tmu/TMU-footer.png" alt="" />
            </div> 
            <div className='flex'>
              <div className='w-fit'> 
                {/* Container for name */}
                <h2 className='text-[#531616] font-light text-xs'>Designed By: </h2>
                <a className='text-[#531616] font-bold text-xs' href="https://www.linkedin.com/in/shefali-sneha-b80274230/" target='_blank'>Shefali Sneha</a>
                <p className='text-[#531616] font-light text-xs'>B.Tech CSE (2021-2025)</p>
                <br />
                <h2 className='text-[#531616] font-light text-xs'>Developed By: </h2>
                <a className='text-[#531616] font-bold text-xs' href="https://www.linkedin.com/in/kushagrakatiha/" target='_blank'>Kushagra Katiha</a>
                <p className='text-[#531616] font-light text-xs'>B.Tech CSE (2021-2025)</p>
              </div>  
            </div> 
          </div>
        </div>
      </div>

         

      <QuestionPaper examName={examName} programName={programName} academicSession={academicSession} semester={semester} year={year} courseCode={courseCode} courseName={courseName} view={view} />
    </>
  )
}

export default QuestionSetter