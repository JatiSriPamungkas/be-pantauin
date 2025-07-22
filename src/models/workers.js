import { dbPool } from "../config/database.js";

export const getWorkers = async () => {
	const SQLQuery = `SELECT * FROM workers;`;

	return await dbPool.execute(SQLQuery);
};
