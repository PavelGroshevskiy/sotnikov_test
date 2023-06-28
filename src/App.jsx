import { Routes, Route } from "react-router-dom";

import "./App.scss";
import Posts from "./pages/Posts";
import Aside from "./components/Aside";
import Photo from "./pages/Photo";
import Todos from "./pages/Todos";

function App() {
	return (
		<div className="wrapper">
			<Aside />
			<div className="container">
				<Routes>
					<Route path="/" element={<Posts />} />
					<Route path="/photo" element={<Photo />} />
					<Route path="/todos" element={<Todos />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
