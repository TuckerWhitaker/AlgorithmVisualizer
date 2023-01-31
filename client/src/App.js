import "./App.css";
import {
	useParams,
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Main from "./components/Main";
import BubbleSort from "./components/BubbleSort";
import BogoSort from "./components/BogoSort";
import Astar from "./components/AStar";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/BubbleSort" element={<BubbleSort />} />
					<Route path="/BogoSort" element={<BogoSort />} />
					<Route path="/AStar" element={<Astar />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
