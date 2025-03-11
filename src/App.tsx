import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import Rentals from "./pages/Rentals";
import Sales from "./pages/Sales";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/property-appraisal" replace />}
            />
            <Route path="/property-appraisal" element={<Sales />} />
            <Route path="/rental-appraisal" element={<Rentals />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
