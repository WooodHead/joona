import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
  Link
} from 'react-router-dom'

import Button from "react-bootstrap/lib/Button";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomMedium,
	AppendBottomBig,
	AppendRight
} from "../styles/layout.css";

import {
	textInput
} from "../styles/Form.css";

export class CreateSongDatabase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}
	
	render() {
		return (
			<div className={RectBox + " " + BoxInnerMedium + " " + AppendBottomBig}>
				<div className={AppendBottomMedium}>
					<label>
						Nimi
					</label>
					<div>
						<input type="text" className={textInput} placeholder="Nimi"
							value={this.state.name}
							onChange={e => {
								this.setState({
									name: e.target.value
								});
							}} />
					</div>
				</div>
				<Link to="/songdatabases">
					<Button className={AppendRight}>
						Peruuta
					</Button>
				</Link>
				<Button bsStyle="success"
					onClick={e => {
						// this.props.createVariation({
						// 	name: this.state.name
						// });
					}}>
					Luo laulutietokanta
				</Button>
			</div>
		)
	}
}

export default compose(

)(CreateSongDatabase);