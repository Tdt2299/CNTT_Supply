// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';
// import { body, validationResult } from 'express-validator';

// const router = express.Router();

// // Đăng ký tài khoản
// router.post(
//   '/register',
//   [
//     body('username').notEmpty().withMessage('Tên người dùng là bắt buộc'),
//     body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, password } = req.body;

//     try {
//       // Kiểm tra xem user đã tồn tại chưa
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Người dùng đã tồn tại!' });
//       }

//       // Mã hóa mật khẩu
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({ username, password: hashedPassword });

//       await newUser.save();
//       res.status(201).json({ message: 'Đăng ký người dùng thành công!' });
//     } catch (error) {
//       res.status(500).json({ message: 'Lỗi máy chủ', error });
//     }
//   }
// );

// // Đăng nhập
// router.post(
//   '/login',
//   [
//     body('username').notEmpty().withMessage('Tên người dùng là bắt buộc'),
//     body('password').notEmpty().withMessage('Mật khẩu là bắt buộc'),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, password } = req.body;

//     try {
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(400).json({ message: 'Không tìm thấy người dùng!' });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Mật khẩu không hợp lệ!' });
//       }

//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//       res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
//       res.json({ message: 'Đăng nhập thành công!', token });
//     } catch (error) {
//       res.status(500).json({ message: 'Lỗi máy chủ', error });
//     }
//   }
// );

// // Đăng xuất
// router.post('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.json({ message: 'Đăng xuất thành công!' });
// });

// // Kiểm tra đăng nhập
// router.get('/me', (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: 'Không xác thực!' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Token không hợp lệ' });
//     }
//     res.json({ message: 'Đã xác thực!', user });
//   });
// });

// export default router;
