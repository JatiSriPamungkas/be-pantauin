import { getUsers, getUsersById, getUsersByEmail, getUsersByRole } from "../models/users.js";

export const getUser = async (req, res) => {
	try {
		const [data] = await getUsers();

		res.status(200).json({
			message: "GET: users successfully",
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			error: "GET: users failed",
			messageErr: error,
		});
	}
};

export const getUserById = async (req, res) => {
	const { userID } = req.params;

	try {
		const [data] = await getUsersById(userID);

		res.status(200).json({
			message: "GET: user by ID successfully",
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			error: "GET: user by ID failed",
			messageErr: error,
		});
	}
};

export const getUserByEmail = async (req, res) => {
	const { email } = req.body;

	try {
		const [data] = await getUsersByEmail(email);

		res.status(200).json({
			message: "GET: user by email successfully",
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			error: "GET: user by email failed",
			messageErr: error,
		});
	}
};

export const getUserByRole = async (req, res) => {
	const { role } = req.query;

	try {
		const [data] = await getUsersByRole(role);

		res.status(200).json({
			message: "GET: user by role successfully",
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			error: "GET: user by role failed",
			messageErr: error,
		});
	}
};
