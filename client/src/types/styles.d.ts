// This will allow you to import '.module.css' files in TypeScript
declare module "*.module.css" {
	const classes: { [key: string]: string };
	export default classes;
}
