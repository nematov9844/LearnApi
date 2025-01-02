/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Stilni import qilish

import { useAxios } from "../hook/useAxios";

function Login() {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const axios = useAxios();
    const navigate = useNavigate();

	const handleLogin = () => {
		if (!phone || !password) {
			toast.error("Telefon raqami va parolni to'ldiring!"); // Xato bildirishnomasini ko'rsatish
			return;
		}
		axios({
			url: "/auth/login",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": "uz",
			},
			body: { phone, password },
		})
			.then((res) => {
				if (res.data) {
					localStorage.setItem("token", res.data.token);
					toast.success("Siz muvaffaqiyatli tizimga kirdingiz!"); // Muvaffaqiyatli bildirishnoma
					navigate("/dashboard");
				}
			})
			.catch((error) => {
				toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring!"); // Xato bildirishnomasini ko'rsatish
				console.log(error);
			});
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-800">
			<div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm">
				<h2 className="text-2xl font-semibold text-center mb-6 text-white">Login</h2>
				<form>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-300" htmlFor="phone">
							Phone Number
						</label>
						<input
							type="tel"
							id="phone"
							placeholder="Enter your phone number"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-300" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						type="button"
						onClick={handleLogin}
						className="w-full bg-blue-600 text-white py-2 rounded-md focus:outline-none hover:bg-blue-700">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
