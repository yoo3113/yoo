import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";



const app = express();
app.use(cors());
app.use(express.json());


// MySQL 연결 
const db = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "비밀번호",
    database: "testdb",
});

//회원가입
app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: "모든 필드를 입력" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            "INSERT INTO users (name,email,password) VALUES(?,?,?)",
            [name, email, hashedPassword]
        );
        res.json({ success: true, message: "회원가입 성공" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "회원가입 실패" });
    }
});

// 로그인