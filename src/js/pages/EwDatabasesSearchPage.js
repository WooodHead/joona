import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import EwDatabasesSearch from "../databases/EwDatabasesSearch";

export class EwDatabasesSearchPage extends React.Component {
	render() {
		return (
			<Row>
				<Col md={12}>
					<EwDatabasesSearch />
				</Col>
			</Row>
		)
	}
}

export default compose(

)(EwDatabasesSearchPage);