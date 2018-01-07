import * as React from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import { Panel, Button } from "react-bootstrap";

import { SongDatabasesSelect } from "../songdatabases";

import { FieldGroup } from "../forms";

type InputProps = {
	onSuccess?: () => void;
	onCancel?: () => void;
};

type Parameters = {
	name?: string;
	filesystemPath?: string;
	songDatabaseId?: number;
};

type ResponseProps = {
	onSuccess?: () => void;
	onCancel?: () => void;
	createEwDatabase?: (props: Parameters) => Promise<any>;
	updateState?: (props: Parameters) => void;
	data?: {
		state: {
			name: string;
			filesystemPath: string;
			songDatabaseId: number;
		};
	};
};

const CREATE_EW_DATABASE_MUTATION = gql`
	mutation createEwDatabase(
		$name: String
		$filesystemPath: String
		$songDatabaseId: ID
	) {
		createEwDatabase(
			name: $name
			filesystemPath: $filesystemPath
			songDatabaseId: $songDatabaseId
		)
	}
`;

const UPDATE_CREATE_EW_DATABASE_MUTATION = gql`
	mutation updateCreateEwDatabaseState(
		$name: String
		$filesystemPath: String
		$songDatabaseId: ID
	) {
		updateCreateEwDatabaseState(
			name: $name
			filesystemPath: $filesystemPath
			songDatabaseId: $songDatabaseId
		) @client
	}
`;

const QUERY_CREATE_EW_DATABASE_STATE = gql`
	query readCreateEwDatabaseState {
		state: createEwDatabaseState {
			name
			filesystemPath
			songDatabaseId
		}
	}
`;

const withCreateEwDatabase = graphql<ResponseProps, InputProps>(
	CREATE_EW_DATABASE_MUTATION,
	{
		props: ({ mutate }) => ({
			createEwDatabase: variables => ({
				variables
			})
		})
	}
);

const withUpdateCreateEwDatabaseState = graphql<ResponseProps, InputProps>(
	UPDATE_CREATE_EW_DATABASE_MUTATION,
	{
		props: ({ mutate }) => ({
			updateState: props =>
				mutate({
					variables: props
				})
		})
	}
);

const withCreateEwDatabaseState = graphql<ResponseProps, InputProps>(
	QUERY_CREATE_EW_DATABASE_STATE
);

export const CreateEwDatabase = compose(
	withCreateEwDatabase,
	withUpdateCreateEwDatabaseState,
	withCreateEwDatabaseState
)((props: ResponseProps) => {
	return (
		<Panel header={<h3>Luo ewtietokanta</h3>}>
			<FieldGroup
				label="Nimi"
				placeholder="Nimi"
				value={props.data.state.name}
				onChange={(value: string) => {
					props.updateState({
						name: value
					});
				}}
			/>
			<FieldGroup
				label="Tiedostojärjestelmäpolku"
				placeholder="Tiedostojärjestelmäpolku"
				value={props.data.state.filesystemPath}
				onChange={(value: string) => {
					props.updateState({
						filesystemPath: value
					});
				}}
			/>
			<div
				style={{
					marginBottom: "10px"
				}}
			>
				<SongDatabasesSelect
					value={props.data.state.songDatabaseId}
					onChange={value => {
						props.updateState({
							songDatabaseId: value
						});
					}}
				/>
			</div>
			<div>
				<Button
					style={{ marginRight: "10px" }}
					onClick={() => {
						if (props.onCancel) {
							props.onCancel();
						}
					}}
				>
					Peruuta
				</Button>
				<Button bsStyle="success"> Luo </Button>
			</div>
		</Panel>
	);
});
