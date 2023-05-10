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
import PhysicsEngine from "./components/PhysicsEngine";
import SortingAlgorithms from "./components/SortingAlgorithms";
import SortingVisualizerParent from "./components/SortingVisualizerParent";
import Water from "./components/Water";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/BubbleSort" element={<BubbleSort />} />
					<Route path="/BogoSort" element={<BogoSort />} />
					<Route path="/AStar" element={<Astar />} />
					<Route path="/PhysicsEngine" element={<PhysicsEngine />} />
					<Route path="/Boids" element={<Boids />} />
					<Route path="/Water" element={<Water />} />
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
