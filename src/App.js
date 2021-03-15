import ScenicSpot from "./Spot-Component/ScenicSpot";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CountyNavbar from "./Spot-Component/CountyNavbar";
import CountyScreen from "./Spot-Component/CountyScreen";

function App() {
  return (
    <Router>
      <CountyNavbar />
      <Route path="/scenicSpot/:countyName" component={CountyScreen} />
      <Route exact path="/scenicSpot" component={ScenicSpot} />
    </Router>
  );
}

export default App;
