import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { routes } from "./Routes/Routes";
import Header from "./Components/Header/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </Router>
  );
}
