import { Outlet } from "react-router-dom";
import Header from "./Layout/Header/Header.jsx";
import Footer from "./Layout/Footer/Footer.jsx";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
