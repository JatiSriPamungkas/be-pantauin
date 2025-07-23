import express from "express";
import cors from "cors";
import QRCode from "qrcode";
import { router as QrRouter } from "./src/routes/qr.js";
import { router as TaskRouter } from "./src/routes/tasks.js";
import { router as UserRouter } from "./src/routes/users.js";
import { router as WorkerRouter } from "./src/routes/workers.js";
import { router as AttendaceRouter } from "./src/routes/attendances.js";
import { getUsersByEmail } from "./src/models/users.js";
import { getValidQRCodeToken } from "./src/models/qr.js";

let currentQRCode = null;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//routes
app.use("/api/qr", QrRouter);
app.use("/api/tasks", TaskRouter);
app.use("/api/users", UserRouter);
app.use("/api/workers", WorkerRouter);
app.use("/api/attendances", AttendaceRouter);

const generateQRCode = async () => {
	const payload = await getValidQRCodeToken();

	if (!payload) {
		console.error("No valid QR code token found");
		return;
	}

	try {
		const qrString = JSON.stringify(payload);
		const qrImageUrl = await QRCode.toDataURL(qrString);

		currentQRCode = {
			data: payload,
			qrImageUrl,
		};

		console.log(payload);
	} catch (error) {
		console.error("Error generating QR code:", error);
		return;
	}
};

// Generate first QR code on server start
generateQRCode();

setInterval(() => {
	generateQRCode();
}, 60 * 1000); // 1 menit

app.get("/", (req, res) => {
	res.send("Welcome to Pantauin API!");
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const [[user]] = await getUsersByEmail(email);

	if (!user) {
		return res.status(404).json({
			error: "User not found",
		});
	}

	if (!user.password) {
		return res.status(400).json({
			error: "Password is required",
		});
	}

	const isPasswordValid = password === user.password;

	if (isPasswordValid) {
		res.status(200).json({
			message: "Login successful",
			data: user,
		});
	} else {
		res.status(401).json({
			error: "Invalid password",
		});
	}
});

app.get("/api/generate-qr", async (req, res) => {
	if (!currentQRCode) return res.status(500).json({ error: "QR not ready" });

	const expired_at = currentQRCode.data.expired_at;
	const qrAge = new Date() - expired_at;

	// Cek apakah QR masih valid (1 menit )
	// if (age > 60 * 1000) {
	// 	return res.status(410).json({ message: "QR expired. Please reload." });
	// }

	return res.status(200).json({
		message: "QR is valid",
		data: currentQRCode.data,
		qrImageUrl: currentQRCode.qrImageUrl,
		qrAge,
	});
});

app.use((req, res) => {
	res.send("<h1>Page not found!</h1>");
});

app.listen(3000, "0.0.0.0", () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
