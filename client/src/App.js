import {
	Route,
	BrowserRouter as Router,
	Routes,
	useParams,
} from "react-router-dom";
import "./App.css";
import Astar from "./components/AStar";
import BogoSort from "./components/BogoSort";
import Boids from "./components/Boids";
import BubbleSort from "./components/BubbleSort";
import Graph from "./components/Graph";
import Main from "./components/Main";
import MergeSort from "./components/MergeSort";
import River from "./components/River";
import SortingAlgorithms from "./components/SortingAlgorithms";
import SortingVisualizerParent from "./components/SortingVisualizerParent";
import Test from "./components/Test";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/River" element={<River />} />
					<Route path="/test" element={<Test />} />
					<Route path="/BubbleSort" element={<BubbleSort />} />
					<Route path="/BogoSort" element={<BogoSort />} />
					<Route path="/AStar" element={<Astar />} />
					<Route path="/Boids" element={<Boids />} />
					<Route path="/MergeSort" element={<MergeSort />} />
					<Route path="/SortingAlgorithms" element={<SortingAlgorithms />} />
					<Route path="/Graph" element={<Graph />} />
					<Route path="/S" element={<SortingVisualizerParent />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
