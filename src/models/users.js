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
