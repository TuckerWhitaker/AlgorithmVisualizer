import { Highlight, themes } from "prism-react-renderer";
import Prism from "prismjs";
import { useEffect, useState } from "react";

let CodeArray = [];
function Delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function SortAlgoVis(props) {
	const [BtnDisabled, SetBtnDisabled] = useState(0);
	function SetBtnDis(bool) {
		SetBtnDisabled(bool);
	}
	const [HighlightedLines, SetHighlightedLines] = useState([]);

	async function highlightCode(i, delaytime) {
		SetHighlightedLines([i]);
		await Delay(delaytime);
	}

	const [BarArray, SetBarArray] = useState([]);

	const resetArray = () => {
		var currentIndex = BarArray.length,
			temporaryValue,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = BarArray[currentIndex];
			BarArray[currentIndex] = BarArray[randomIndex];
			BarArray[randomIndex] = temporaryValue;
		}

		SetBarArray([...BarArray]);
	};

	useEffect(() => {
		CodeArray = props.codeBlock;
		for (let i = 1; i <= 41; i++) {
			BarArray.push(i);
			//BarArray.push(Math.floor(Math.random() * 60) + 2);
		}

		resetArray();
	}, []);

	return (
		<div className="SortAlgoVis" id={props.id}>
			<div className="SortAlgoVisTitle">{props.Title}</div>
			<div className="SortAlgoVisDescTop">{props.Description}</div>
			<div className="SortAlgoVisGraph">
				{BarArray.map((info, index) => {
					return (
						<div
							className="SortAlgoVisGraphBar"
							id={props.VisID + "BarArray" + index}
							key={index}
							style={{ height: info / 2 + "vh" }}
						>
							{info}
						</div>
					);
				})}
			</div>
			<input
				type="range"
				min="0"
				max="300"
				className="SortAlgoSlider"
				onChange={(e) => {
					props.SetDelay(e.target.value);
				}}
			></input>
			<div className="SortAlgoBtnContainer">
				<button
					id={"SortAlgoVisButton" + props.id}
					disabled={BtnDisabled}
					className="SortAlgoVisButton"
					onClick={() => {
						props.Sort(BarArray, SetBarArray, highlightCode, SetBtnDis);
						SetBtnDis(true);
					}}
				>
					Sort
				</button>
				<button
					disabled={BtnDisabled}
					className="SortAlgoVisButton"
					onClick={() => {
						resetArray();
					}}
				>
					Randomize
				</button>
			</div>
			<div className="SortAlgoVisBottomHalf">
				<div className="SortAlgoVisDesc">
					{props.Description}
					<br /> <br /> Average Time Complexity: {props.TimeComplexity}
				</div>

				<div className="SortAlgoVisCode">
					<Highlight
						code={props.codeBlock}
						language="jsx"
						theme={themes.vsDark}
					>
						{({ className, style, tokens, getLineProps, getTokenProps }) => (
							<pre className={className} style={{ ...style, padding: "20px" }}>
								{tokens.map((line, i) => {
									let lineProps = getLineProps({ line, key: i });

									if (HighlightedLines.includes(i)) {
										lineProps.style = {
											...lineProps.style,
											backgroundColor: "rgba(173, 216, 230, 0.3)",
										};
									}

									return (
										<div key={i} {...lineProps}>
											<span>{i + 1}</span>
											{line.map((token, key) => {
												let tokenProps = getTokenProps({ token });
												tokenProps.style = {
													...tokenProps.style,
													textShadow: "none",
												};

												return <span key={key} {...tokenProps} />;
											})}
										</div>
									);
								})}
							</pre>
						)}
					</Highlight>
				</div>
			</div>
		</div>
	);
}

export default SortAlgoVis;
