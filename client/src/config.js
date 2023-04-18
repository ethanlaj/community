export default {
	apiUrl:
		process.env.NODE_ENV === "production"
			? "http://community-alb-2-1638402382.us-east-1.elb.amazonaws.com:3001"
			: "http://localhost:3001",
};
