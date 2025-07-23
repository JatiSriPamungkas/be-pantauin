import { dbPool } from "../config/database.js";

export const getTotalWorkers = async () => {
	const SQLQuery = `SELECT COUNT(*) AS total_worker FROM workers;`;

	return await dbPool.execute(SQLQuery);
};

export const getAllWorkers = async () => {
	const SQLQuery = `select u.id, u.name, w.phone_number, w.address  from users u join workers w on u.id = w.user_id;`;

	return await dbPool.execute(SQLQuery);
};

export const getWorkerAndTasks = async () => {
	const SQLQuery = `
		SELECT w.id, u.name AS worker_name, t.title AS task_name
		FROM workers w
		JOIN users u ON w.user_id = u.id
		JOIN task_assignments ta ON w.id = ta.worker_id
		JOIN tasks t ON ta.task_id = t.id;
	`;

	return await dbPool.execute(SQLQuery);
};
