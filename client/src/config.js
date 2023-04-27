export default {
	apiUrl:
		process.env.NODE_ENV === "production"
			? "https://community-production-c11b.up.railway.app"
			: "http://localhost:3001",
};
