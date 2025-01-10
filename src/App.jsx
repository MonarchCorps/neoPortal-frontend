/* eslint-disable react/prop-types */
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Login from './features/pages/auth/login/Login'
import Register from './features/pages/auth/register/Register'
import { Toaster } from 'react-hot-toast'
import Classroom from './components/Classroom/Classroom'
import Subject from './components/Subjects/Subject'
import NotFound from './components/NotFound'
import Question from './components/Subjects/Question'
import { availableSubjects } from './utils/subjects'
import { questions } from './utils/questions'
import CbtPractice from './components/CbtPractice/CbtPractice'
import CbtExamConfig from './components/CbtPractice/CbtExamConfig'
import CbtSubjects from './components/CbtPractice/CbtSubjects'
import CbtExam from './components/CbtPractice/CbtExam'
import RequireAuth from './components/RequireAuth'
import StudentDashboard from './features/pages/dashboard/Student/StudentDashboard'
import SchoolDashboard from './features/pages/dashboard/School/SchoolDashboard'
import TeacherDashboard from './features/pages/dashboard/Teacher/TeacherDashboard'
import useAuth from './hooks/useAuth'
import StudentHomeDashboard from './features/pages/dashboard/Student/StudentHomeDashboard'
import EditProfile from './features/pages/dashboard/SimilarPages/EditProfile'
import TeacherHomeDashboard from './features/pages/dashboard/Teacher/TeacherHomeDashboard'
import Unauthorized from './components/Unauthorized'
import PracticeExam from './features/pages/dashboard/Teacher/Exam/PracticeExam/PracticeExam'
import UploadedExams from './features/pages/dashboard/Teacher/UploadedExams/UploadedExams'
import EditExamDetails from './features/pages/dashboard/Teacher/EditExam/EditExamDetails'
import ExamSummaryWrapper from './components/CbtPractice/ExamSummaryWrapper'
import ExamHistoryWrapper from './components/CbtPractice/ExamHistoryWrapper'
import StudentExamHistory from './features/pages/dashboard/Student/StudentExamHistory'
import LiveExam from './components/LiveExam/LiveExam'
import TeacherLiveExamPage from './features/pages/dashboard/Teacher/Exam/LiveExam/TeacherLiveExamPage'
import MonitorStudents from './features/pages/dashboard/Teacher/Monitor/MonitorStudents'
import SchoolHomeDashboard from './features/pages/dashboard/School/SchoolHomeDashboard'
import SavedQuestions from './components/SavedQuestions'

function ProtectedSubjectRoute({ children }) {
	const { subject } = useParams();
	if (!availableSubjects.includes(subject)) {
		return <Navigate to="/not-found" replace />;
	}
	return children;
}

function ProtectedQuestionRoute({ children }) {
	const { subject, questionId } = useParams();
	const currentSubjectQuestions = subject && questions.filter(que => que?.subject === subject).length

	// Checks if the path before the questionId is valid and if the questionId is not greater than the current subject questions
	if (!availableSubjects.includes(subject) || (availableSubjects.includes(subject) && questionId > currentSubjectQuestions)) {
		return <Navigate to="/not-found" replace />;
	}
	return children;
}


function App() {

	const { auth } = useAuth()

	const pathToRedirect = () => {
		switch (auth?.role) {
			case 'school':
				return 'school-institute';
			case 'teacher':
				return 'teacher';
			case 'student':
				return 'student'
			default:
				return '/auth'
		}
	}


	return (
		<>
			<Routes>
				<Route path='/auth' element={<Login />} />
				<Route path='/register' element={<Register />} />

				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />

					<Route path='/about' element={<About />} />

					<Route path='/contact' element={<Contact />} />

					<Route path='/classroom'>
						<Route index element={<Classroom />} />
						<Route path=':subject' >
							<Route index element={
								<ProtectedSubjectRoute>
									<Subject />
								</ProtectedSubjectRoute>
							} />
							<Route path=':questionId' element={
								<ProtectedQuestionRoute>
									<Question />
								</ProtectedQuestionRoute>
							} />
						</Route>
					</Route>

					<Route path='/cbt-practice' element={<CbtPractice />}>
						<Route index element={<CbtSubjects />} />
						<Route path='exam-config' element={<CbtExamConfig />} />
					</Route>
					<Route element={<RequireAuth allowedRoles={['teacher', 'student', 'school']} />}>
						{/* I created another cbt-practice route because the two routes nested inside the <CbtPractice /> is being confined in <Outlet /> */}
						<Route path='/cbt-practice/exam' element={<CbtExam />} />
						<Route path='/cbt-practice/exam-summary/:summaryId' element={<ExamSummaryWrapper />} />
						<Route path='/cbt-practice/exam-history' element={<ExamHistoryWrapper />} />
						<Route path='/cbt-practice/live-exam'>
							<Route index element={<LiveExam />} />
						</Route>
						<Route path='/saved-questions' element={<SavedQuestions />} />
					</Route>

					<Route path="/dashboard" element={<Navigate to={`/dashboard/${pathToRedirect()}`} replace />} />

					<Route element={<RequireAuth allowedRoles={['school']} />}>
						<Route path='dashboard/school-institute' element={<SchoolDashboard />}>
							<Route index element={<SchoolHomeDashboard />} />
							<Route path='edit-profile' element={<EditProfile />} />
						</Route>
					</Route>

					<Route element={<RequireAuth allowedRoles={['teacher']} />}>
						<Route path='dashboard/teacher' element={<TeacherDashboard />}>
							<Route index element={<TeacherHomeDashboard />} />
							<Route path='edit-profile' element={<EditProfile />} />
							<Route path='practice-exam' element={<PracticeExam />} />
							<Route path='uploaded-exams'>
								<Route index element={<UploadedExams />} />
								<Route path=':examID/edit' element={<EditExamDetails />} />
							</Route>
							<Route path='live-exam'>
								<Route index element={<TeacherLiveExamPage />} />
							</Route>
							<Route path='monitor-students' element={<MonitorStudents />} />
						</Route>
					</Route>

					<Route element={<RequireAuth allowedRoles={['student']} />}>
						<Route path='dashboard/student' element={<StudentDashboard />}>
							<Route index element={<StudentHomeDashboard />} />
							<Route path='exam-history' element={<StudentExamHistory />} />
							<Route path='edit-profile' element={<EditProfile />} />
						</Route>
					</Route>

				</Route>

				<Route path='/unauthorized' element={<Unauthorized />} />
				<Route path='/not-found' element={<NotFound />} />
				<Route path='*' element={<NotFound />} />

			</Routes>
			<Toaster
				position="bottom-center"
				reverseOrder={false}
				containerClassName='text-wrap text-center'
			/>
		</>
	)
}

export default App