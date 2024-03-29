
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Welcome, Error } from './pages'
import { AddEvent, AllEvents, SharedLayout, Profile, Stats, Users, UpdateUsers, ProtectedRoute } from './pages/dashboard'
import AdminRoute from './pages/dashboard/AdminRoute';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AllEvents />} />
          <Route path="stats" element={<Stats />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="profile" element={<Profile />} />

          <Route path="/users" element=
            {
              <AdminRoute>
                <Users />
              </AdminRoute>
            } />

          <Route path="/update-users" element=
            {
              <AdminRoute>
                <UpdateUsers />
              </AdminRoute>
            } />


        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="*" element={<Error />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
