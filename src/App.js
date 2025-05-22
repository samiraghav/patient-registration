import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EditPatientForm from "./components/EditPatientForm/EditPatientForm";
import NotFoundPage from './pages/NotFound';
import LandingPage from './components/LandingPage/LandingPage';
import AdminDashboard from './components/RegisterDashboard/RegisterDashboard';
import PatientDetailPage from './components/PatientDetail/PatientDetail';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<AdminDashboard />} />
            <Route path="/patients/:id" element={<PatientDetailPage />} />
            <Route path="/edit/:id" element={<EditPatientForm />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
