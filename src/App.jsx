import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Auth = lazy(() => import("./components/auth"));
const FireStore = lazy(() => import("./components/firestore"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div style={{ display: "flex", minHeight: "90vh" }}>
          <section style={{ flexGrow: 1 }}>
            <h1>ReactJS + FireBase</h1>
            <ul>
              <li>
                <Link to="authentication">Authentication</Link>
              </li>
              <li>
                <Link to="firestore">FireStore</Link>
              </li>
            </ul>
          </section>
          <section
            style={{
              flexGrow: 4,
              borderLeft: "1px solid #999",
              paddingLeft: "40px",
            }}
          >
            <Routes>
              <Route path="/authentication" element={<Auth />} />
              <Route path="/firestore" element={<FireStore />} />
            </Routes>
          </section>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
