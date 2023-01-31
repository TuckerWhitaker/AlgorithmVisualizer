function Tile(props) {
	let ID = props.ID;

	return (
		<div className="Square" id={ID}>
			<div className="HCost">{ID}</div>
			<div className="GCost">1</div>
		</div>
	);
}

export default Tile;
