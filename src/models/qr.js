import { dbPool } from "../config/database.js";

export const createsPresensi = async (worker_id, check_in, status, notes) => {
	const SQLQuery = `
        INSERT INTO attendances ( worker_id, check_in, check_out, status, notes) VALUES
        ( ?, ?, null, ?, ?);
    `;

	return await dbPool.execute(SQLQuery, [worker_id, check_in, status, notes]);
};
