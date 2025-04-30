import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Add this
import Component from './component'; // your App.jsx
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  </StrictMode>
);

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Component from './component'; // Your landing page
// import Chatbot from './App'; // ⚡ Correct import!

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Component />} /> 
//         <Route path="/Chatbot" element={<Chatbot />} /> 
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

