let Array = [10];
let Code =
	"let bubbleSort = (arr) => { let len = arr.length; for (let i = len-1; i >=0; i--) { for(let j = 1; j<=i; j++){ if(arr[j-1]>arr[j]) { let temp = arr[j-1]; arr[j-1] = arr[j]; arr[j] = temp; } } } return arr; }";
for (let i = 0; i < 40; i++) {
	Array.push(Math.floor(Math.random() * 60) + 2);
}

function SortAlgoVis() {
	return (
		<div className="SortAlgoVis">
			<div className="SortAlgoVisTitle">Title</div>

			<div className="SortAlgoVisGraph">
				{Array.map((info, index) => {
					return (
						<div
							className="SortAlgoVisGraphBar"
							key={index}
							style={{ height: info / 2 + "vh" }}
						>
							{info}
						</div>
					);
				})}
			</div>
			<div className="SortAlgoVisBottomHalf">
				<div className="SortAlgoVisDesc">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
					egestas purus viverra accumsan in nisl nisi scelerisque. Elementum
					integer enim neque volutpat. Nunc id cursus metus aliquam eleifend mi
					in nulla posuere. Nunc mi ipsum faucibus vitae aliquet nec. Habitant
					morbi tristique senectus et netus et. Mauris a diam maecenas sed enim
					ut sem viverra. Integer vitae justo eget magna fermentum iaculis eu
					non. Massa sapien faucibus et molestie ac feugiat.
				</div>
				<div className="SortAlgoVisCode">{Code}</div>
			</div>
		</div>
	);
}

export default SortAlgoVis;
