export default {
	apiUrl:
		process.env.NODE_ENV === "production"
			? "https://us-central1-community-9eef4.cloudfunctions.net/api/"
			: "http://localhost:3001/community-9eef4/us-central1/api/",
};
