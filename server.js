import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js"

// Инициализация Express приложения
const app = express();
const PORT = 3002;

// Middleware для обработки JSON-запросов
app.use(express.json());

// Подключение к базе данных MongoDB
await mongoose.connect("mongodb://127.0.0.1:27017/myDB");

// POST - создание нового пользователя
app.post("/api/users", async (req, res) => {
    try {
        const { email, password, isVerified } = req.body;
        const newUser = await User.create({ email, password, isVerified });
        res.status(201).send(newUser); // Отправляем созданного пользователя
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - получение всех пользователей
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users); // Возвращаем список пользователей
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - получение пользователя по id
app.get("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - удаление пользователя по id
app.delete("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.deleteOne({ _id: id });

        if (result.deletedCount === 1) {
            res.json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - Полное обновление пользователя по id
app.put("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, isVerified } = req.body;

        const updatedUser = await User.findOneAndReplace(
            { _id: id },
            { email, password, isVerified },
            { new: true }
        );

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH - Частичное обновление пользователя по id
app.patch("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updates, {
            new: true, // Возвращает обновленный документ
        });

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});