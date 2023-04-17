export default {
	apiUrl: process.env.NODE_ENV === "production" ? "http://api:3001" : "http://localhost:3001",
};
