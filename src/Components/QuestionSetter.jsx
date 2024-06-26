import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import '../App.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

function QuestionSetter() {

  // Variables
  const [image, setImage] = useState(null);
  const [addImage, setAddImage] = useState(false);
  const [questionText, setQuestionText] = useState(null)
  const [examName, setExamName] = useState('')
  const [selectedPrograms, setSelectedPrograms] = useState([])
  const [semester, setSemester] = useState('')
  const [year, setYear] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [courseName, setCourseName] = useState('')
  const [otherProgram, setOtherProgram] = useState('')
  // set Questions
  const [shortQuestions, setShortQuestions] = useState([])
  const [longQuestions, setLongQuestions] = useState([])
  // long question will have subtype, if subtype is 1 then do nothing, if subtype is 2 two question of 5 makrs each
  const [longQuestionSubType, setLongQuestionSubType] = useState(1)
  const [subQuestion1, setSubQuestion1] = useState(null)
  const [subQuestion2, setSubQuestion2] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null);

  // long question with sub question
  const [longQuestion, setLongQuestion] = useState({})
  const [questionType, setQuestionType] = useState('choose');
  const [unit, setUnit] = useState('-');
  const [bloomLevel, setBloomLevel] = useState('-');
  const [co, setCo] = useState('-');
  const bottomRef = useRef(null); // Reference to the bottom element

  // Navigate to the next page
  const navigate = useNavigate();

  const handlePreview = () => {
    if (shortQuestions.length === 8 && longQuestions.length === 4) {
      // Navigate to the next page
      navigate('/format')
    } else {
      alert('You have to add 8 short and 4 long questions')
    }
  }

  // Save long question array into local storage
  useEffect(() => {
    localStorage.setItem('longQuestions', JSON.stringify(longQuestions));
  }, [longQuestions]);

  // Save short question array into local storage
  useEffect(() => {
    localStorage.setItem('shortQuestions', JSON.stringify(shortQuestions));
  }, [shortQuestions]);

  // Print long questions and short questions from local storage when the component mounts

  // Save Exams Details into the local storage
  useEffect(() => {
    localStorage.setItem('examName', JSON.stringify(examName));
    localStorage.setItem('selectedPrograms', JSON.stringify(selectedPrograms));
    localStorage.setItem('semester', JSON.stringify(semester));
    localStorage.setItem('year', JSON.stringify(year));
    localStorage.setItem('courseCode', JSON.stringify(courseCode));
    localStorage.setItem('courseName', JSON.stringify(courseName));
    localStorage.setItem('otherProgram', JSON.stringify(otherProgram));
  }, [examName, selectedPrograms, semester, year, courseCode, courseName, otherProgram]);


  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }]
  ];
  // Functions

  const handleAddImage = () => {
    setAddImage(!addImage);
    // Clear previously selected image
    setSelectedImage(null);
  };

  const handleRemoveImage = () => {
    setImage(null); // Clear the selected image
    setSelectedImage(null); // Clear the selected image from state
  };

  // Function to allow user to add image to the question
const handleImageChange = (e) => {
  const selectedImage = e.target.files[0];
  setImage(selectedImage); // Update state with selected image
  setSelectedImage(selectedImage); // Update state with selected image
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

  const handleOtherProgram = (e) => {
    setOtherProgram(e.target.value)
  }

  const handleCourseName = (e) => {
    setCourseName(e.target.value)
  }

  const handleQuestionType = (e) => {
    setQuestionType(e.target.value)
  }

  const handleLongQuestionSubType = (e) => {
    setLongQuestionSubType(e.target.value)
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

  const handleAddSubQuestion1 = () => {
    if(Object.keys(longQuestion).length == 1){
      alert('Already Added')
      return;
    }

    if(Object.keys(longQuestion).length == 2){
      alert('Both the quesions already added')
      return;
    }

    if (subQuestion1 == null || subQuestion1 === '<p><br></p>') {
      alert('Please enter the question');
      return; // Exit the function early
    }

    // Check if bloomLevel, unit, and co are not selected
    if (unit === '-' || bloomLevel === '-' || co === '-') {
      alert('Please select Unit, Bloom\'s Level, and Course Outcome.');
      return; // Exit the function early
    }

    const question = {
      ques: subQuestion1, // Set the ques property to the content from the Froala Editor
      maxMarks: 5,
      unit: unit,
      bloomLevel: bloomLevel,
      co: co,
      image: image ? URL.createObjectURL(image) : null,
    };
    setLongQuestion({ ...longQuestion, subQuestion1: question });
    setSubQuestion1(null);
    setImage(null);   // Clear the selected image
    setSelectedImage(null)
    setAddImage(false);
    setBloomLevel('-');
    setUnit('-');
    setCo('-');
    alert('Sub Question 1 added')
  }

  const handleAddSubQuestion2 = () => {
    if(Object.keys(longQuestion).length == 0){
      alert('Enter First Questions First')
      return;
    }

    if(Object.keys(longQuestion).length == 2){
      alert('Both the questions already added')
      return;
    }

    if (subQuestion2 == null || subQuestion2 === '<p><br></p>') {
      alert('Please enter the question');
      return; // Exit the function early
    }

    // Check if bloomLevel, unit, and co are not selected
    if (unit === '-' || bloomLevel === '-' || co === '-') {
      alert('Please select Unit, Bloom\'s Level, and Course Outcome.');
      return; // Exit the function early
    }

    const question = {
      ques: subQuestion2, // Set the ques property to the content from the Froala Editor
      maxMarks: 5,
      unit: unit,
      bloomLevel: bloomLevel,
      co: co,
      image: image ? URL.createObjectURL(image) : null,
    };
    setLongQuestion({ ...longQuestion, subQuestion2: question });
    setSubQuestion2(null);
    setImage(null);   // Clear the selected image
    setAddImage(false);
    alert('Sub Question 2 added')
  }

  const handleAddQuestion = () => {
    // Check if the question type is not selected
    if (questionType === 'choose') {
      alert('Please select the question type');
      return; // Exit the function early
    }

    // Check if unit, bloomLevel, and co are not selected
    if (unit === '-' || bloomLevel === '-' || co === '-') {
      alert('Please select Unit, Bloom\'s Level, and Course Outcome.');
      return; // Exit the function early
    }

    if (
      (questionType === 'short' && shortQuestions.length < 8) ||
      (questionType === 'long' && longQuestions.length < 4)
    ) {
      const marks = questionType === 'long' ? 10 : 2;
      // check if long question has sub question
      if (longQuestionSubType === '2') {
        if (Object.keys(longQuestion).length != 2) {
          alert('Please enter both sub questions');
          return; // Exit the function early
        }
        setLongQuestions((prevLongQuestions) => [...prevLongQuestions, longQuestion]);
        alert(`${longQuestions.length + 1} Long question added`);
        setLongQuestion({});
        setLongQuestionSubType(1);
        setSubQuestion1(null);
        setSubQuestion2(null);
        setQuestionType('choose');
        setUnit('');
        setBloomLevel('');
        setCo('');
        setQuestionText(null);
        setImage(null);   // Clear the selected image
        setSelectedImage(null)
        setAddImage(false);
        return;
      }

      // Check if the question is not empty
      if (questionText == null || questionText === '<p><br></p>') {
        alert('Please enter the question');
        return; // Exit the function early
      }

      const question = {
        ques: questionText, // Set the ques property to the content from the Froala Editor
        maxMarks: marks,
        unit: unit,
        bloomLevel: bloomLevel,
        co: co,
        image: image ? URL.createObjectURL(image) : null,
      };
      if (questionType === 'long') {
        setLongQuestions((prevLongQuestions) => [...prevLongQuestions, question]);
        alert(`${longQuestions.length + 1} Long question added`);
      } else if (questionType === 'short') {
        setShortQuestions([...shortQuestions, question]);
        alert(`${shortQuestions.length + 1} Short question added`);
      }
      setQuestionType('choose');
      setUnit('');
      setBloomLevel('');
      setCo('');
      setQuestionText(null);
      setImage(null);   // Clear the selected image
      setSelectedImage(null)
      setAddImage(false);
    } else {
      alert('You can only add 8 short and 4 long questions');
    }
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div id='main_page' className='h-full'>
        {/* Container for heading and banner */}
        <div className='bg-gradient-to-r from-orange-500 to-orange-700 flex justify-center items-center py-5'>
          <h1 className='text-center font-extrabold py-4 w-auto text-5xl'>THE EXAM SETTER</h1>
          <img src="https://www.tmu.ac.in/monaco/assets/image/logo.png" alt="banner_img" />
        </div>

        <hr className='border-2 border-black' />

        {/* Container for upper part */}
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-evenly w-full mt-3 items-center py-6'>
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
              <div className='flex flex-col gap-4'>
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
                    <option value="" disabled="">Select Program....</option>
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

                <div>
                  <input className='border-2 border-[#9c36b5] h-10 focus:outline-none px-2 bg-black text-white rounded-lg'
                    type="text"
                    placeholder='Other Program...'
                    value={otherProgram}
                    onChange={handleOtherProgram}
                  />
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
            <div className='w-1/3 shadow-black shadow-2xl'>
              <img src="https://iili.io/JXX6IkJ.md.jpg" alt="clock_tower" className='rounded-lg' />
            </div>
          </div>
          <button onClick={() => {
            scrollToBottom();
          }} className='px-4 py-2 border-4 font-extrabold border-[#9c36b5] rounded-2xl mb-10 '>Set Questions Now <span className='font-extrabold text-2xl'>&darr;</span></button>
        </div>



        {/* Container to set Question Text */}
        <h1 className='text-center font-extrabold text-3xl mt-10 p-auto text-black'>Set Questions Below </h1>
        {/* Bloom Level Details */}
        <p className="px-4 text-white bg-black py-2 border-4 font-extrabold border-[#9c36b5] rounded-2xl mb-0 text-center w-fit m-auto">
          Bloom Levels:{" "}
          {`1-Remenbering 2-Understanding 3-Applying 4-Analyzing 5-Evaluating 6-Creating`}
        </p>
        <div className='flex ml-10 items-end mt-5 gap-10 font-extrabold'>
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

            {/* Container to set question subtype */}
            {questionType === 'long' && (
              <div className='bg-black p-2 rounded-lg border-2 border-[#9c36b5]'>
                <h2 className='font-bold text-white text-base'>Two Parts Needed ?</h2>
                {/* Dropdown to set question type */}
                <select className='focus:outline-none h-8 text-white px-1 py-1 bg-black border-[#9c36b5] border-2 rounded-lg' value={longQuestionSubType} onChange={handleLongQuestionSubType}>
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
              </div>
            )}

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

          {/* Container to set question */}
          {/* If long questions sub type is two add two questions of 5 marks each*/}

          {questionType === 'long' && longQuestionSubType === '2' ? (
            <div className='flex flex-col justify-center items-center w-full'>
              {/* Long Sub Question 1 container */}
              <div className='text-center w-11/12 flex flex-col gap-1'>

                <div className='flex gap-5 justify-between items-center w-full'>
                  <button className='bg-black mb-2 border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleAddImage}>
                    Add Image
                  </button>
                  {/* Create a custom button to trigger file input */}
                  <label className={addImage ? "visible custom-file-upload" : "hidden custom-file-upload"} >
                    Choose File
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>

                  <div className="selected-image-container">
                    {selectedImage && (
                      <div className="selected-image-box">
                        <img className='h-40 w-40' src={URL.createObjectURL(selectedImage)} alt="Selected" />
                        <button className="remove-image-button" onClick={handleRemoveImage}>
                        &#10005;
                        </button>
                      </div>
                    )}
                  </div>
                <div id="editor" className=' bg-black rounded-lg border-2 border-[#9c36b5] p-2'>
                  <ReactQuill modules={{ toolbar: toolbarOptions }} className='bg-white text-black p-4' theme="snow" value={subQuestion1} onChange={setSubQuestion1} />
                </div>

                {/* Container to put add button*/}
                <div className='flex'>
                  <button className='bg-black border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleAddSubQuestion1}>Add sub question 1</button>
                </div>
              </div>

              {/* Long Sub Question 2 container */}
              <div className='text-center w-11/12 flex flex-col gap-1'>
                <div className='flex gap-5 justify-between items-center w-full'>
                  <button className='bg-black mb-2 border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleAddImage}>
                    Add Image
                  </button>
                  {/* Create a custom button to trigger file input */}
                  <label className={addImage ? "visible custom-file-upload" : "hidden custom-file-upload"} >
                    Choose File
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>

                  <div className="selected-image-container">
                    {selectedImage && (
                      <div className="selected-image-box">
                        <img className='h-40 w-40' src={URL.createObjectURL(selectedImage)} alt="Selected" />
                        <button className="remove-image-button" onClick={handleRemoveImage}>
                        &#10005;
                        </button>
                      </div>
                    )}
                  </div>
                <div id="editor" className=' bg-black rounded-lg border-2 border-[#9c36b5] p-2'>
                  <ReactQuill modules={{ toolbar: toolbarOptions }} className='bg-white text-black p-4' theme="snow" value={subQuestion2} onChange={setSubQuestion2} />
                </div>

                {/* Container to put add button*/}
                <div className='flex'>
                  <button className='bg-black border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleAddSubQuestion2}>Add sub question 2</button>
                </div>
              </div>

              <div className='flex'>
                <button className='bg-black border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleAddQuestion}>Add Question</button>
              </div>
            </div>
          ) : (
            <div className='text-center w-4/5 flex flex-col gap-1'>

              <div className='flex gap-5 justify-between items-center w-full'>
                <button className='bg-black mb-2 border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleAddImage}>
                  Add Image
                </button>
                {/* Create a custom button to trigger file input */}
                <label className={addImage ? "visible custom-file-upload" : "hidden custom-file-upload"} >
                  Choose File
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>

                <div className="selected-image-container">
                  {selectedImage && (
                    <div className="selected-image-box">
                      <img className='h-40 w-40' src={URL.createObjectURL(selectedImage)} alt="Selected" />
                      <button className="remove-image-button" onClick={handleRemoveImage}>
                      &#10005;
                      </button>
                    </div>
                  )}
                </div>
              <div id="editor" className=' bg-black rounded-lg border-2 border-[#9c36b5] p-2'>
                <ReactQuill modules={{ toolbar: toolbarOptions }} className='bg-white text-black p-4' theme="snow" value={questionText} onChange={setQuestionText} />
              </div>

              {/* Container to put add and done buttons */}
              <div className='flex'>
                <button className='bg-black border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleAddQuestion}>Add</button>

                <button className='bg-black border-2 border-[#ff0000] text-[#523bff] px-4 py-2 rounded-lg mt-4 ml-4' onClick={handlePreview}>Preview</button>
              </div>
            </div>
          )}

        </div>
        <hr className='border-2 border-black mt-5' />
        {/* Container for Credentials */}
        <div ref={bottomRef} className='h-full w-full flex bg-gradient-to-r from-orange-500 to-orange-700 justify-center gap-3 pt-10 pb-8 items-center'>
          <div className='w-fit flex'>
            {/* Container for name */}
            <div className='text-white'>
              <h2 className='font-light text-xs'>Developed By: </h2>
              <a className='font-bold text-xs' href="https://www.linkedin.com/in/kushagrakatiha/" target='_blank'>Kushagra Katiha</a>
              <p className='font-light text-xs'>B.Tech CSE (2021-2025)</p>
            </div>
            {/* Container for image */}
            <div className='mx-3'>
              <img src="https://www.tmu.ac.in/img/tmu/TMU-footer.png" alt="" />
            </div>

            <div className='text-white'>
              <h2 className='font-light text-xs'>Designed By: </h2>
              <a className='font-bold text-xs' href="https://www.linkedin.com/in/shefali-sneha-b80274230/" target='_blank'>Shefali Sneha</a>
              <p className='font-light text-xs'>B.Tech CSE (2021-2025)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionSetter
