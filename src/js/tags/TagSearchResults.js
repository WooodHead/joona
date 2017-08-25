import React from "react";
import {
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import {
	List
} from "../styles/List.css";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomSmall
} from "../styles/Layout.css";

export class TagSearchResults extends React.Component {
	render() {
		return (
			<div>
				<ul className={List}>
					<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
						<Link to={this.props.getItemLink(1)}>
							Joona
						</Link>
					</li>
					<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
						<Link to={this.props.getItemLink(2)}>
							Jsound
						</Link>
					</li>
					<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
						<Link to={this.props.getItemLink(3)}>
							HL
						</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default compose(

)(TagSearchResults);