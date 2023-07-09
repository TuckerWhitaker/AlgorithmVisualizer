function VisualizerTile(props) {
	return (
		<div className="VisualizerTile" onClick={props.customClickEvent}>
			<div className="VisualizerTileTitle">{props.Title} </div>
			<img className="VisualizerTileImg" src={props.GIF}></img>
			<div className="VisualizerTileDesc">{props.Description}</div>
		</div>
	);
}

export default VisualizerTile;
