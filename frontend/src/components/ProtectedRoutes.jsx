import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/user";

export default function ProtectedRoute({ children }) {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/**
 * Example usage in your App.jsx or routing file:
 * 
 * import ProtectedRoute from './components/ProtectedRoute';
 * 
 * <Routes>
 *   <Route path="/login" element={<LoginRegister />} />
 *   <Route path="/" element={<LandingSection />} />
 *   
 *   // Protected routes
 *   <Route 
 *     path="/lessons" 
 *     element={
 *       <ProtectedRoute>
 *         <Lessons />
 *       </ProtectedRoute>
 *     } 
 *   />
 *   
 *   <Route 
 *     path="/profile" 
 *     element={
 *       <ProtectedRoute>
 *         <Profile />
 *       </ProtectedRoute>
 *     } 
 *   />
 *   
 *   <Route 
 *     path="/quiz/:lessonId" 
 *     element={
 *       <ProtectedRoute>
 *         <Quiz />
 *       </ProtectedRoute>
 *     } 
 *   />
 * </Routes>
 */