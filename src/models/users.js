import { dbPool } from "../config/database.js";

export const getUsers = () => {
	const SQLQuery = "SELECT * FROM users";

	return dbPool.execute(SQLQuery);
};

export const getUsersById = (userID) => {
	const SQLQuery = "SELECT * FROM users WHERE id = ?";

	return dbPool.execute(SQLQuery, [userID]);
};

export const getUsersByEmail = (email) => {
	const SQLQuery = "SELECT * FROM users WHERE email = ?";

	return dbPool.execute(SQLQuery, [email]);
};

export const getUsersByRole = (role) => {
	const SQLQuery = "SELECT * FROM users WHERE role = ?";

	return dbPool.execute(SQLQuery, [role]);
};

export const updateUser = (userID) => {
	const SQLQuery = "UPDATE users SET updated_at = NOW() WHERE id = ?";

	return dbPool.execute(SQLQuery, [userID]);
};
