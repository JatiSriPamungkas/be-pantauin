import { dbPool } from "../config/database.js";

export const getValidQRCodeToken = async () => {
	const SQLQuery = `
        SELECT token, expired_at
        FROM qr_codes
        WHERE expired_at > NOW()
        ORDER BY expired_at ASC
        LIMIT 1;
    `;
	const [rows] = await dbPool.execute(SQLQuery);
	return rows.length ? { token: rows[0].token, expired_at: rows[0].expired_at } : null;
};

export const createQRCodes = async (token, expiredAt) => {
	const SQLQuery = `
        INSERT INTO qr_codes (project_id, token, expired_at)
        VALUES (1, ?, ?);
    `;
	await dbPool.execute(SQLQuery, [token, expiredAt]);
};
