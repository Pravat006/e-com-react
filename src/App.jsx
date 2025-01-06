import "./App.css";
// import Header from './components/root/Header'
import Searchbar from "./components/root/Searchbar";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="text-center bg-blue-900 text-white p-4 text-4xl">
        {" "}
        hello{" "}
      </div>
      {/* <Header/> */}
      <Searchbar />
    
      
    </>
  );
}

export default App;
