import { dbPool } from "../config/database.js";

export const getTasks = () => {
	const SQLQuery = "SELECT * FROM tasks";

	return dbPool.execute(SQLQuery);
};
