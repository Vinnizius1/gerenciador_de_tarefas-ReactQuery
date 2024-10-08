import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import TaskList from "./components/TaskList/TaskList";

import "./App.module.css";

/* Componente principal da aplicação. */
const App = () => {
  return (
    <>
      <Header />
      <TaskList />
      <Footer />
    </>
  );
};

export default App;
