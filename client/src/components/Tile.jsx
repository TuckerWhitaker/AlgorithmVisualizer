function Tile(props) {
	let ID = props.ID;

	return (
		<div className="Square" id={ID}>
			<div className="HCost" id={ID + "F"}>
				{props.f}{" "}
			</div>
		</div>
	);
}

export default Tile;
