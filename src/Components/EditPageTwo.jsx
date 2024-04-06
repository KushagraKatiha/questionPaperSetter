import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import '../App.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

function EditQuestionTwo() {

    const navigate = useNavigate();

    // useEffect(() => {
    //     // Check if the user accessed the page directly by manipulating the URL
    //     const isDirectAccess = window.history.state.idx === 0;
    //     if (isDirectAccess) {
    //         // Redirect the user to the home page
    //         alert('Invalid Access to Edit Page !!')
    //         navigate('/');
    //     }
    // }, [navigate]);

    const longQuestions = JSON.parse(localStorage.getItem('longQuestions')) || [];
    const shortQuestions = JSON.parse(localStorage.getItem('shortQuestions')) || [];

    console.log("long questions: ", longQuestions);
    console.log("short questions: ", shortQuestions);

    // Variables
    const [questionType, setQuestionType] = useState('choose');
    const [questionNumber, setQuestionNumber] = useState(1);
    const [ques, setQues] = useState(null);
    const [subQues1, setSubQues1] = useState(null);
    const [subQues2, setSubQues2] = useState(null);
    const [twoParts, setTwoParts] = useState(null);

    useEffect(() => {
        setTwoParts(longQuestions[questionNumber - 1]?.subQuestion2 ? 2 : 1)
        setSubQues1(longQuestions[questionNumber - 1]?.subQuestion1?.ques)
        setSubQues2(longQuestions[questionNumber - 1]?.subQuestion2?.ques)
    }, [questionNumber, longQuestions])

    useEffect(() => {
        setQues(questionType === 'long' ? longQuestions[questionNumber - 1]?.ques : questionType === 'short' && shortQuestions.length > 0 ? shortQuestions[questionNumber - 1]?.ques : null);

    }, [questionType, questionNumber, shortQuestions]);

    useEffect(() => {
        setQuestionText(ques);
        setSubQuestion1(subQues1);
        setSubQuestion2(subQues2);
        setLongQuestionSubType(twoParts);
    }, [ques]);

    console.log(subQues1);
    console.log(subQues2);
    console.log(twoParts);

    const [image, setImage] = useState(null);
    const [addImage, setAddImage] = useState(false);
    const [questionText, setQuestionText] = useState(null)
    // long question will have subtype, if subtype is 1 then do nothing, if subtype is 2 two question of 5 makrs each
    const [longQuestionSubType, setLongQuestionSubType] = useState(twoParts)
    const [subQuestion1, setSubQuestion1] = useState(null)
    const [subQuestion2, setSubQuestion2] = useState(null)
    // long question with sub question
    const [longQuestion, setLongQuestion] = useState({})
    const [unit, setUnit] = useState('-');
    const [bloomLevel, setBloomLevel] = useState('-');
    const [co, setCo] = useState('-');
    const bottomRef = useRef(null); // Reference to the bottom element

    // variable to set the value in blooms level
    const [boolVal, setBoolVal] = useState(null)
    useEffect(() => {
        setBoolVal(questionType === 'long' ? longQuestions[questionNumber]?.bloomLevel : questionType === 'short' && shortQuestions.length > 0 ? shortQuestions[questionNumber - 1]?.bloomLevel : null);
    }, [questionType, questionNumber, shortQuestions])

    const [unitVal, setUnitVal] = useState(null)
    useEffect(() => {
        setUnitVal(questionType === 'long' ? longQuestions[questionNumber]?.unit : questionType === 'short' && shortQuestions.length > 0 ? shortQuestions[questionNumber - 1]?.unit : null);
    }, [questionType, questionNumber, shortQuestions])

    const [coVal, setCoVal] = useState(null)
    useEffect(() => {
        setCoVal(questionType === 'long' ? longQuestions[questionNumber]?.co : questionType === 'short' && shortQuestions.length > 0 ? shortQuestions[questionNumber - 1]?.co : null);
    }, [questionType, questionNumber, shortQuestions])

    const [imgBtn, setImgBtn] = useState(null)
    const [quesImg, setQuesImg] = useState(null)
    useEffect(() => {
        setQuesImg(questionType === 'long' ? longQuestions[questionNumber - 1]?.image : questionType === 'short' && shortQuestions.length > 0 ? shortQuestions[questionNumber - 1]?.image : null);
        console.log(quesImg);
        setImgBtn(quesImg != null ? 'Change Image' : 'Add Image')
    }, [questionType, questionNumber, shortQuestions])



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
    };

    // Function to allow user to add image to the question
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

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

    const handleQuestionNumber = (e) => {
        setQuestionNumber(e.target.value)
    }

    const handleAddSubQuestion1 = () => {
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
        setAddImage(false);
        setBloomLevel('-');
        setUnit('-');
        setCo('-');
        alert('Short Question 1 added')
    }

    const handleAddSubQuestion2 = () => {
        if (subQues1 == null || subQues1 === '<p><br></p>') {
            alert('Please enter first sub-quesiton first');
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
        // setSubQuestion2(null);
        setImage(null);   // Clear the selected image
        setAddImage(false);
        alert('Short Question 2 added')
    }

    const handleUpdateQuestion = () => {

        const quesNumber = questionNumber;

        // Determine the storage based on the question type
        const storageKey = questionType === 'long' ? 'longQuestions' : 'shortQuestions';

        let questions = JSON.parse(localStorage.getItem(storageKey));

        // Find the index of the question to be updated
        const questionIndex = quesNumber - 1;

        // Check if the question index is valid
        if (questionIndex < 0 || questionIndex >= questions.length) {
            alert('Invalid question number');
            return;
        }

        // If it's a long question with subquestions
        if (questionType === 'long' && longQuestionSubType === '2') {
            if (subQues1 == null || subQues1 === '<p><br></p>' || subQues2 == null || subQues2 === '<p><br></p>') {
                alert('Please enter the sub questions');
                return;
            }
            const updatedQuestion = {
                ...longQuestion
            }

            // Delete the existing question at the specified index
            questions.splice(questionIndex, 1);

            // Insert the updated question at the same index
            questions.splice(questionIndex, 0, updatedQuestion);

            // Save the updated questions back to the storage
            localStorage.setItem(storageKey, JSON.stringify(questions));

            // Reset state variables
            setQuestionText(null);
            setImage(null);
            setAddImage(false);
            setBloomLevel('-');
            setUnit('-');
            setCo('-');
            setQuestionType("choose")
            alert('Question updated successfully');
            return
        };


        // Create the updated question model
        const maxMarks = questionType === 'long' ? 10 : 2;
        let updatedQuestion = {
            ques: questionText,
            unit: unit,
            maxMarks,
            bloomLevel: bloomLevel,
            co: co,
            image: image ? URL.createObjectURL(image) : null
        };

        // Delete the existing question at the specified index
        questions.splice(questionIndex, 1);

        // Insert the updated question at the same index
        questions.splice(questionIndex, 0, updatedQuestion);

        // Save the updated questions back to the storage
        localStorage.setItem(storageKey, JSON.stringify(questions));

        // Reset state variables
        setQuestionText(null);
        setImage(null);
        setAddImage(false);
        setBloomLevel('-');
        setUnit('-');
        setCo('-');
        setQuestionType("choose")

        alert('Question updated successfully');
    };

    useEffect(() => {
        console.log(image);
    }, [image]);

    const handleDone = () => {
        navigate('/format')
    }

    useEffect(() => {
        const longQuestions = localStorage.getItem('longQuestions')
        const shortQuestions = localStorage.getItem('shortQuestions')
        console.log(`Long Questions:- ${longQuestions}`)
        console.log(`Short Questions:- ${shortQuestions}`)
    }, [])

    return (
        <>
            <div id='main_page' className='h-full'>
                {/* Container for heading and banner */}
                <div className='bg-gradient-to-r from-orange-500 to-orange-700 flex justify-center items-center py-5'>
                    <h1 className='text-center font-extrabold py-4 w-auto text-5xl'>THE EXAM SETTER</h1>
                    <img src="https://www.tmu.ac.in/monaco/assets/image/logo.png" alt="banner_img" />
                </div>

                <hr className='border-2 border-black' />

                {/* Container to set Question Text */}
                <h1 className='text-center font-extrabold text-3xl mt-10 p-auto text-black'>Edit Questions Below </h1>
                {/* Bloom Level Details */}
                <p className="px-4 py-2 border-4 font-extrabold border-[#9c36b5] rounded-2xl text-center w-fit m-auto mt-2">
                    *Bloom Level{" "}
                    {`{1-Remenbering, 2-Understanding, 3-Applying, 4-Analyzing, 5-Evaluating, 6-Creating}`}
                </p>

                {/* Container For Question Type */}
                {
                    shortQuestions.map((question, index) => {
                        return (
                            <div className='flex ml-10 items-end mt-5 gap-10 font-extrabold'>
                                {/* Container for other details */}
                                <div className='flex flex-col gap-5 h-full'>
                                    {/* Container for question number to be edited */}
                                    <div className='bg-black p-2 rounded-lg border-2 border-[#9c36b5]'>
                                        <h2 className='font-bold text-white text-base'>Question Number</h2>
                                        {/* Dropdown to set question number */}     
                                            <p type='number' className='focus:outline-none h-8 text-white px-3 py-1 bg-black border-[#9c36b5] border-2 rounded-lg w-fit'  onChange={handleQuestionNumber}>
                                              {index+1}
                                            </p>
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
                                                <option value={unitVal}>{unitVal}</option>
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
                                                <option value={boolVal}>{boolVal}</option>
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
                                                <option value={coVal}>{coVal}</option>
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

                                {(questionType === 'long' && longQuestionSubType === '2') || (questionType === 'long' && twoParts === 2) ? (
                                    <div className='flex flex-col justify-center items-center w-full'>
                                        {/* Long Sub Question 1 container */}
                                        <div className='text-center w-11/12 flex flex-col gap-1'>

                                            <div className='flex gap-5 justify-between items-center w-full'>
                                                <button className='bg-black mb-2 border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleAddImage}>
                                                    {imgBtn}
                                                </button>
                                                {/* Create a custom button to trigger file input */}
                                                <label className={addImage ? "visible custom-file-upload" : "hidden custom-file-upload"} >
                                                    Choose File
                                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                                </label>
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

                                            <div id="editor" className=' bg-black rounded-lg border-2 border-[#9c36b5] p-2'>

                                                <ReactQuill modules={{ toolbar: toolbarOptions }} className='bg-white text-black p-4' theme="snow" value={subQuestion2} onChange={setSubQuestion2} />
                                            </div>

                                            {/* Container to put add button*/}
                                            <div className='flex'>
                                                <button className='bg-black border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleAddSubQuestion2}>Add sub question 2</button>
                                            </div>
                                        </div>

                                        <div className='flex'>
                                            <button className='bg-black border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleUpdateQuestion}>Update Question</button>
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

                                        {quesImg && (
                                            <div className="text-center mt-4">
                                                <img src={quesImg} alt="Question Image" className="max-w-xs mx-auto" />
                                            </div>
                                        )}

                                        <div id="editor" className=' bg-black rounded-lg border-2 border-[#9c36b5] p-2'>

                                            <ReactQuill modules={{ toolbar: toolbarOptions }} className='bg-white text-black p-4' theme="snow" value={question.ques} onChange={setQuestionText} />
                                        </div>

                                        {/* Container to put add and done buttons */}
                                        <div className='flex'>
                                            <button className='bg-black border-2 border-[#9c36b5] text-[#9c36b5] px-4 py-2 rounded-lg mt-4' onClick={handleUpdateQuestion}>Update Question</button>

                                            <button className='bg-black border-2 border-[#ff0000] text-[#523bff] px-4 py-2 rounded-lg mt-4 ml-4' onClick={handleDone}>Done</button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )
                    })
                }

                <hr className='border-2 border-black mt-5' />
                {/* Container for Credentials */}
                <div ref={bottomRef} className='h-full w-full flex bg-gradient-to-r from-orange-500 to-orange-700 justify-center gap-3 pt-8 pb-2 items-center'>
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

export default EditQuestionTwo
