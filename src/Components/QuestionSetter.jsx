import React, { useEffect } from 'react'
import { useState } from 'react'
import QuestionPaper from './QuestionPaper'
import '../App.css'

function QuestionSetter() {
  // Variables

  const [examName, setExamName] = useState('')
  const [selectedPrograms, setSelectedPrograms] = useState([])
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
  const [image, setImage] = useState(null);
  const [addImage, setAddImage] = useState(false);

  // Functions

  const handleAddImage = () => {
    setAddImage(!addImage);
  };
  // Function to allow user to add image to the question
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  // Function to handle exam name
  const handleExamName = (e) => {
    setExamName(e.target.value)
  }

  // Function to handle adding selected program
  const handleProgramSelection = (e) => {
    const program = e.target.value;
    if (!selectedPrograms.includes(program)) {
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };

  // Function to handle removing selected program
  const handleRemoveProgram = (program) => {
    setSelectedPrograms(selectedPrograms.filter((p) => p !== program));
  };

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
  }, [semester])

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
      (questionType === 'short' && shortQuestions.length < 4) ||
      (questionType === 'long' && longQuestions.length < 4)
    ) {
      const marks = questionType === 'long' ? 10 : 2;
      const question = {
        text: questionText,
        maxMarks: marks,
        unit: unit,
        bloomLevel: bloomLevel,
        co: co,
        // Add image if it exists
        image: image ? URL.createObjectURL(image) : null,
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
      setAddImage(false);
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
        <div className='flex justify-evenly w-full mt-7 items-center py-10'>
          {/* container for exam and program */}
          <div className='flex flex-col w-1/4 gap-10'>
            <div>
              <h2 className='font-bold text-lg'>Exam Name</h2>
              {/* Input to set exam name */}
              <input className='border-2 w-full border-[#9c36b5] h-10 focus:outline-none px-2 bg-black text-white rounded-lg'
                type="text"
                placeholder='Enter exam name...'
                value={examName}
                onChange={handleExamName}
              />
            </div>

            {/* Container to set program name */}
            <div className='flex flex-col'>
              {/* Display selected programs */}
              <div className='flex flex-wrap gap-2 '>
                {selectedPrograms.map((program, index) => (
                  <div key={index} className='bg-black rounded-lg px-2 py-1'>
                    <span className='text-white'>{program}</span>
                    <button
                      onClick={() => handleRemoveProgram(program)}
                      className='ml-2 text-red-500 focus:outline-none'
                    >
                      &#10005;
                    </button>
                  </div>
                ))}
              </div>
              <div className='w-full'>
                <h2 className='font-bold text-lg'>Program Name</h2>
                {/* Dropdown to select program names */}
                <select
                  className='w-full border-2 border-[#9c36b5] h-10 focus:outline-none px-2 bg-black text-[#9CA3AF] rounded-lg'
                  onChange={handleProgramSelection}
                >
                  <option value="" disabled="" selected="">Select Program....</option>
                  <option value="B.Tech CSE">B.Tech. (CSE) (Computer Sciences and Engineering)</option>
                  <option value="B.Tech AI-ML-DL">B.Tech. (CSE) Specialization in Artificial
                    Intelligence, Machine Learning &amp;
                    Deep Learning</option>
                  <option value="B.Tech CTIS">B.Tech.(CSE)-Cloud Technology &amp; InformationSecurity (CTIS)(In Collaboration with i-Nurture) (Was Offered till 2023-24.)</option>
                  <option value="B.Tech TCS">B.Tech. (CSE)-Data Science (In Collaboration with i-Nurture) (Was Offered till 2023-24.)</option>
                  <option value="B.Tech i-Nurture">B.Tech.(CSE)-Cyber Security
                    (In Collaboration with i-Nurture) (Was Offered till 2023-24.)</option>
                  <option value="B.Tech AI">B.Tech.(CSE)-specialisation in Artificial Intelligence (In Collaboration with i-Nurture) (Was Offered till 2023-24.)</option>
                  <option value="B.Tech IBM">B.Tech.(CSE)-Application Development usingCloud &amp; Analytics Platform (In Collaboration with IBM) (Was Offered till 2023-24.)</option>
                  <option value="B.Tech TCS">B.Tech.(CSE)-Data Science (In Collaboration with TCS iON)</option>
                  <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                  <option value="BCA MAWT">BCA-Mobile Applications &amp; WebTechnologies (MAWT)(in collaboration with i-Nurture) (Was Offered till 2023-24.)</option>
                  <option value="BCA CTIS">BCA- Cloud Technology &amp; InformationSecurity (CTIS)(in collaboration with i-Nurture) (Was Offered till 2023-24.)</option>
                  <option value="BCA Hons.">BCA (Hons.)
                    with Research (From Session 2023-24 Onwards)</option>
                  <option value="B.Sc. Animation">B.Sc. (Animation)</option>
                  <option value="B.Sc. CS">B.Sc.(Computer Science) (From Session 2023-24 Onwards)</option>
                  <option value="B.Sc.Hons.CS">B.Sc. (Hons.)
                    Compute Science
                    with Research</option>
                  <option value="M.Tech. CSE">M.Tech. (Computer Sciences and Engineering)</option>
                  <option value="MCA">MCA (Master of Computer Applications)-Software Development</option>
                  <option value="MCA-ML">MCA (Master of Computer Applications)-Machine Learning</option>
                  <option value="MCA-NT">MCA (Master of Computer Applications)-Network Technologies</option>
                  <option value="MCA-DS">MCA (Master of Computer Applications)-Data Science &amp; Analytics</option>
                  <option value="MCA-AT">MCA (Master of Computer Applications)-Advance Technologies</option>
                  <option value="M.Sc.-AI">M.Sc.-Artificial Intelligence (From Session 2023-24 Onwards)</option>
                  <option value="M.Sc.-DS">M.Sc.- Data Science (From Session 2023-24 Onwards)</option>
                </select>
              </div>
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
            <img src="https://iili.io/JXX6IkJ.md.jpg" alt="clock_tower" className='rounded-lg' />
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
            <div className='flex flex-col'>
              <div className='flex gap-5 justify-between items-center w-full'>
                <button className='bg-black mb-2 border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleAddImage}>
                  Add Image
                </button>
                {/* Create a custom button to trigger file input */}
                <label className={addImage? "visible custom-file-upload": "hidden custom-file-upload"} >
                  Choose File
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
              {/* Textarea to set question */}
              <textarea value={questionText} onChange={handleQuestionText} className='mt-3 border-2 border-[#9c36b5] rounded-lg bg-black text-white p-3 resize-none focus:outline-none' rows={8} cols={50} placeholder='Enter question...' />
            </div>
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

      <QuestionPaper examName={examName} selectedPrograms={selectedPrograms} semester={semester} year={year} courseCode={courseCode} courseName={courseName} shortQuestions={shortQuestions} longQuestions={longQuestions} view={view} />

    </>
  )
}

export default QuestionSetter
