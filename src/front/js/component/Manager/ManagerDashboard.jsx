import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext.js"

import { FaCircleArrowLeft, FaUserGraduate } from 'react-icons/fa6';
import { Certificate } from '../User/Certificate.jsx';

import { ManagerCourses } from '../Manager/ManagerCourses.jsx';
import { ManagerProfile } from '../Manager/ManagerProfile.jsx';
import { Payments } from './Payments.jsx';
import { Teachers } from './Teachers.jsx';
import { ActiveUsers } from './ActiveUsers.jsx';
import { GeneralFiles } from '../Manager/GeneralFiles.jsx';
import { PostCourseM } from './PostCourseM.jsx';
import { CourseCard } from '../Courses/CourseCard.jsx';
import { ModuleCourse } from '../Module/ModuleCourse.jsx'
import { QuizzesCourse } from '../Quizzes/QuizzesCourse.jsx';
import { CreateCategory } from './CreateCategory.jsx';
import { GetQuizzes } from './GetQuizzes.jsx';
import { CreatePayment } from './CreatePayment.jsx';
import { GetPayment } from './GetPayment.jsx';
import { GetModule } from './GetModule.jsx';
import { WelcomeManager } from './WelcomeManager.jsx';

import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { LuBookUp } from "react-icons/lu";
import { RiSoundModuleFill } from "react-icons/ri";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc"
import { TbCategoryPlus } from "react-icons/tb"
import { GrUpdate } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlineQuiz } from "react-icons/md"
import { MdOutlineChromeReaderMode } from "react-icons/md"
import { VscFileSubmodule } from "react-icons/vsc"
import { MdOutlinePayment } from "react-icons/md";
import { AiOutlineFundView } from "react-icons/ai";
import { PiCertificate } from "react-icons/pi"
import { MdErrorOutline } from "react-icons/md";




export const ManagerDashboard = () => {
    const { store, actions } = useContext(Context)
    const [buttonSelected, setButtonSelected] = useState(<WelcomeManager />)

    function homeManager() {
        setButtonSelected(<WelcomeManager />)
    }

    const handleCreateCourse = () => {
        setButtonSelected(<PostCourseM />)
    }

    const handleGetPayment = () => {
        setButtonSelected(<GetPayment />)
        actions.getPayments()
    }

    const handleCreatePayment = () => {
        setButtonSelected(<CreatePayment />)
    }

    const handleUpdateCourse = () => {
        setButtonSelected(<CourseCard />)
    }

    const handleMyCourses = () => {
        setButtonSelected(<ManagerCourses />)
        actions.getCourse()
    }

    const handleMyModule = () => {
        setButtonSelected(<ModuleCourse />)
        actions.getModules()
    }


    const handleMyQuizzes = () => {
        setButtonSelected(<QuizzesCourse />)
        actions.getQuizzes()
    }

    const handleGetModules = () => {
        setButtonSelected(<GetModule />)
        actions.getModules()
    }



    const handleMyProfile = () => {
        setButtonSelected(<ManagerProfile />)
    }

    const handlePayments = () => {
        setButtonSelected(<Payments />)
    }

    const handleTeachers = () => {
        setButtonSelected(<Teachers />)
        actions.getUser()
    }

    const handleUsers = () => {
        setButtonSelected(<ActiveUsers />)
        actions.getUser()
    }

    const HandleFiles = () => {
        setButtonSelected(<GeneralFiles />)
    }

    const handlePDF = () => {
        setButtonSelected(<Certificate />)
    }

    const handleCreateCategory = () => {
        setButtonSelected(<CreateCategory />)
    }

    const navigate = useNavigate()
    function handleHome() {
        navigate('/')
    }
    return (
        <div className="row">
            <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
            >
                MENU
            </button>



            <div className="offcanvas offcanvas-start"
                /* data-bs-scroll="true" */
                data-bs-backdrop="false"
                tabIndex="-1"
                id="offcanvasScrolling"
                aria-labelledby="offcanvasScrollingLabel">


                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel" onClick={homeManager}>Manager Dashboard</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="text-center">
                        <div className="fs-4" onClick={handleHome} style={{ cursor: 'pointer' }}>
                            <FaCircleArrowLeft />
                        </div>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyProfile}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <CgProfile />
                                </div>
                                <div>
                                    <h5>Profile</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleCreatePayment}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdPayments />
                                </div>
                                <div>
                                    <h5>Create Payment</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleCreateCourse}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <LuBookUp />
                                </div>
                                <div>
                                    <h5>Create Courses</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyModule}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <RiSoundModuleFill />
                                </div>
                                <div>
                                    <h5>Create Modules</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyQuizzes}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    < VscGitPullRequestGoToChanges  />
                                </div>
                                <div>
                                    <h5>Create Quizzes</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-primary my-2 w-75' onClick={handleCreateCategory}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <TbCategoryPlus />
                                </div>
                                <div>
                                    <h5>Create Category</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleUpdateCourse}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <GrUpdate />
                                </div>
                                <div>
                                    <h5>Update Courses</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyQuizzes}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlineQuiz />
                                </div>
                                <div>
                                    <h5>View Quizzes</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleGetModules}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlineChromeReaderMode />
                                </div>
                                <div>
                                    <h5>View Modules</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleGetPayment}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdOutlinePayment />
                                </div>
                                <div>
                                    <h5>View Payment</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyCourses}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <AiOutlineFundView  />
                                </div>
                                <div>
                                    <h5>View Courses</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-primary my-2 w-75' onClick={handleTeachers}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <FaUserGraduate />
                                </div>
                                <div>
                                    <h5>View Teachers</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-primary my-2 w-75' onClick={handleUsers}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <BsFillPersonLinesFill />
                                </div>
                                <div>
                                    <h5>View Users</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-primary my-2 w-75' onClick={HandleFiles}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <VscFileSubmodule />
                                </div>
                                <div>
                                    <h5>Files</h5>
                                </div>
                            </div>
                        </button>

                        <button className='btn btn-outline-primary my-2 w-75' onClick={handlePDF}>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <PiCertificate />
                                </div>
                                <div>
                                    <h5>Certificate</h5>
                                </div>
                            </div>
                        </button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handlePayments} disabled>

                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='p-1 mx-1 border rounded-circle d-flex justify-content-center align-items-center'>
                                    <MdErrorOutline />
                                </div>
                                <div>
                                    <h5>Sin datos</h5>
                                </div>
                            </div>
                        </button>

                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center h-100">
                {buttonSelected}
            </div>
        </div>
    )
}

