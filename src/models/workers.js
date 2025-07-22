import { dbPool } from "../config/database.js";

export const getWorkers = async () => {
	const SQLQuery = `SELECT COUNT(*) AS total_worker FROM workers;`;

	return await dbPool.execute(SQLQuery);
};
