import * as React from "react";

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { Link } from "react-router-dom";
import { graphql, ChildProps } from "react-apollo";
import { PAGE_VIEWER_QUERY } from "./servergql";

import { getNavigationBarViewerQuery } from "./types";

const withViewer = graphql(PAGE_VIEWER_QUERY);

export const NavigationBar = withViewer(
	(props: ChildProps<{}, getNavigationBarViewerQuery>) => {
		if (props.data.loading) {
			return <div />;
		}

		if (props.data.error) {
			return <div />;
		}

		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">Joona </Link>
					</Navbar.Brand>
				</Navbar.Header>
				{props.data.viewer.user && (
					<Nav>
						<NavDropdown
							id="songdatabases-menu"
							eventKey={1}
							title="Tietokannat"
						>
							<LinkContainer to="/songdatabases">
								<MenuItem eventKey={1.1}>
									Laulutietokannat
								</MenuItem>
							</LinkContainer>
						</NavDropdown>
						<LinkContainer to="/songs">
							<NavItem eventKey={2}>Laulut</NavItem>
						</LinkContainer>
						<NavDropdown
							id="lisukkeet-menu"
							eventKey={3}
							title="Lisukkeet"
						>
							<LinkContainer to="/tags">
								<MenuItem eventKey={3.1}>Tunnisteet</MenuItem>
							</LinkContainer>
							<LinkContainer to="/languages">
								<MenuItem eventKey={3.2}>Kielet</MenuItem>
							</LinkContainer>
							<LinkContainer to="/authors">
								<MenuItem eventKey={3.3}>Kirjoittajat</MenuItem>
							</LinkContainer>
							<LinkContainer to="/copyrights">
								<MenuItem eventKey={3.4}>
									Tekijänoikeudet
								</MenuItem>
							</LinkContainer>
						</NavDropdown>
						<NavDropdown
							id="hallinta-menu"
							eventKey={5}
							title="Hallinta"
						>
							<LinkContainer to="/matiasclients">
								<MenuItem eventKey={5.1}>Matiakset</MenuItem>
							</LinkContainer>
						</NavDropdown>
					</Nav>
				)}
				<Nav pullRight={true}>
					{props.data.viewer.adminInitialized &&
						!props.data.viewer.user && (
							<LinkContainer to="/login">
								<NavItem eventKey={1}>Kirjaudu</NavItem>
							</LinkContainer>
						)}
				</Nav>
			</Navbar>
		);
	}
);
