import {
	Route,
	BrowserRouter as Router,
	Routes,
	useParams,
} from "react-router-dom";
import "./App.css";
import Astar from "./components/AStar";
import BinaryTree from "./components/BinaryTree";
import BogoSort from "./components/BogoSort";
import Boids from "./components/Boids";
import BubbleSort from "./components/BubbleSort";
import Graph from "./components/Graph";
import Main from "./components/Main";
import MergeSort from "./components/MergeSort";
import Pathfinding from "./components/Pathfinding";
import River from "./components/River";
import RiverV2 from "./components/RiverV2";
import SearchAlgorithms from "./components/SearchAlgorithms";
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
					<Route path="/River2" element={<RiverV2 />} />
					<Route path="/test" element={<Test />} />
					<Route path="/BubbleSort" element={<BubbleSort />} />
					<Route path="/BogoSort" element={<BogoSort />} />
					<Route path="/AStar" element={<Astar />} />
					<Route path="/Boids" element={<Boids />} />
					<Route path="/MergeSort" element={<MergeSort />} />
					<Route path="/SortingAlgorithms" element={<SortingAlgorithms />} />
					<Route path="/Graph" element={<Graph />} />
					<Route path="/S" element={<SortingVisualizerParent />} />
					<Route path="/BinaryTree" element={<BinaryTree />} />
					<Route path="/SearchAlgorithms" element={<SearchAlgorithms />} />
					<Route path="/Pathfinding" element={<Pathfinding />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
