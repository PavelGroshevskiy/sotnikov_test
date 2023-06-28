import { Link } from "react-router-dom";
import styles from "./index.module.scss";

function Aside() {
	return (
		<div className={styles.root}>
			<Link to={"/"}>Posts</Link>
			<Link to={"/photo"}>Photo</Link>
			<Link to={"/todos"}>Todo</Link>
		</div>
	);
}

export default Aside;
