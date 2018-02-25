import gql from "graphql-tag";

export const PAGE_VIEWER_QUERY = gql`
	query getPageViewer {
		viewer {
			id
			user {
				id
				userName
			}
			adminInitialized
		}
	}
`;
