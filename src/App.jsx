import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserStatusContextProvider from './components/contexts/UserStatus';
import MainLayout from './layouts/MainLayout';
import AddBookPage from './pages/AddBookPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import QuestionnairePage from './pages/QuestionnairePage';
import RegisterPage from './pages/RegisterPage';
import StoriesPage from './pages/StoriesPage';
import BooksPage from './pages/BooksPage';
function App() {
  return (
    <UserStatusContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="questionnaire" element={<ProtectedRoute><QuestionnairePage /></ProtectedRoute>} />
            <Route path="add-book" element={<ProtectedRoute><AddBookPage /></ProtectedRoute>} />
            <Route path="stories" element={<ProtectedRoute> <StoriesPage/>  </ProtectedRoute>} />
            <Route path="books" element={<ProtectedRoute><BooksPage /></ProtectedRoute>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </UserStatusContextProvider>
  );
}

export default App;
