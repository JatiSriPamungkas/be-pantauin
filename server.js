import express from "express";
import cors from "cors";
import QRCode from "qrcode";
import { router as TaskRouter } from "./src/routes/tasks.js";
import { router as UserRouter } from "./src/routes/users.js";
import { router as QrRouter } from "./src/routes/qr.js";
import { getUsersByEmail } from "./src/models/users.js";

let currentQRCode = null;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//routes
app.use("/api/tasks", TaskRouter);
app.use("/api/users", UserRouter);
app.use("/api/qr", QrRouter);

const generateQRCode = async () => {
	const payload = {
		sessionId: "123456",
		timestamp: Date.now(),
	};

	const qrString = JSON.stringify(payload);
	const qrImageUrl = await QRCode.toDataURL(qrString);

	currentQRCode = {
		data: payload,
		qrImageUrl,
		createdAt: Date.now(),
	};
};

// Generate first QR code on server start
generateQRCode();

// Update QR code every 30 seconds
setInterval(() => {
	generateQRCode();
}, 30 * 1000); // 30 detik

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

app.get("/api/qr", async (req, res) => {
	if (!currentQRCode) return res.status(500).json({ error: "QR not ready" });

	const now = Date.now();
	const age = now - currentQRCode.createdAt;

	// Cek apakah QR masih valid (1 menit )
	if (age > 60 * 1000) {
		return res.status(410).json({ message: "QR expired. Please reload." });
	}

	return res.status(200).json({
		message: "QR is valid",
		data: currentQRCode.data,
		qrImageUrl: currentQRCode.qrImageUrl,
	});
});

app.use((req, res) => {
	res.send("<h1>Page not found!</h1>");
});

app.listen(3000, () => {
	console.log(`Server is running on http://192.168.100.26:${PORT}`);
});
