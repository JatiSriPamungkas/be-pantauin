import { getTasks } from "../models/tasks.js";

export const getTask = async (req, res) => {
	try {
		const [data] = await getTasks();

		res.status(200).json({
			message: "GET: tasks successfully",
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			error: "GET: tasks failed",
			messageErr: error,
		});
	}
};
