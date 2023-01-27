import "./App.css";
import {
	useParams,
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Main from "./components/Main";
import BubbleSort from "./components/BubbleSort";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/BubbleSort" element={<BubbleSort />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
