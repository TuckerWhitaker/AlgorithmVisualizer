import {
	Route,
	BrowserRouter as Router,
	Routes,
	useParams,
} from "react-router-dom";
import "./App.css";

import BinaryTree from "./components/BinaryTree";

import Boids from "./components/Boids";

import Graph from "./components/Graph";
import Main from "./components/Main";

import Pathfinding from "./components/Pathfinding";

import SearchAlgorithms from "./components/SearchAlgorithms";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/Boids" element={<Boids />} />
					<Route path="/Graph" element={<Graph />} />
					<Route path="/BinaryTree" element={<BinaryTree />} />
					<Route path="/SearchAlgorithms" element={<SearchAlgorithms />} />
					<Route path="/Pathfinding" element={<Pathfinding />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
