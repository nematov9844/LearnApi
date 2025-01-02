/** @format */

import { useState } from "react";
import { useAxios } from "../hook/useAxios";
import { useLocalStorage } from "../hook/UseLocalStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Crud() {
	const { getValue, setValue, updateItem, removeItem } = useLocalStorage("subject", []);
	const [subject, setSubject] = useState("");
	const [subjectId, setSubjectId] = useState(null);
	const axios = useAxios();

	const createSubject = async () => {
		const token = localStorage.getItem("token");
		if (!subject.trim()) return;
		try {
			const res = await axios({
				url: "/subject",
				method: "POST",
				body: { name: subject },
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			setValue(res);
			setSubject("");
			toast.success("Subject created successfully!");
		} catch (error) {
			console.log(error);

			toast.error("Error creating subject!");
		}
	};

	const getSubject = async (id) => {
		const token = localStorage.getItem("token");
		try {
			const res = await axios({
				url: `/subject/${id}`,
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			setSubject(res.name);
			setSubjectId(res.id);
		} catch (error) {
			console.log(error);
			toast.error("Error getting subject!");
		}
	};

	const updateSubject = async () => {
		if (!subjectId || !subject.trim()) return;
		const token = localStorage.getItem("token");
		try {
			const res = await axios({
				url: `/subject/${subjectId}`,
				method: "PUT",
				body: { name: subject },
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			updateItem(res, subjectId);
			setSubject("");
			setSubjectId(null);
			toast.success("Subject updated successfully!");
		} catch (error) {
			console.log(error);
			toast.error("Error updating subject!");
		}
	};

	const deleteSubject = async () => {
		if (!subjectId) return;
		const token = localStorage.getItem("token");
		try {
			const res = await axios({
				url: `/subject/${subjectId}`,
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			removeItem(subjectId);
			setSubject("");
			setSubjectId(null);
			toast.success("Subject deleted successfully!");
		} catch (error) {
			console.log(error);
			toast.error("Error deleting subject!");
		}
	};

	return (
		<div className='flex flex-col items-center gap-4 bg-gray-800 text-white h-full'>
			<div className='w-full bg-gray-900 gap-4 flex items-center justify-center p-4'>
				<input
					className='bg-gray-700 text-white outline-none px-2 py-1 rounded-md'
					type='text'
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					placeholder='Create or Edit Subject'
				/>
				<button
					onClick={createSubject}
					className='bg-blue-600 px-3 py-1 font-bold rounded-md'>
					Save
				</button>
				{subjectId && (
					<button
						onClick={updateSubject}
						className='bg-yellow-500 px-3 py-1 font-bold rounded-md'>
						Update
					</button>
				)}
				{subjectId && (
					<button
						onClick={deleteSubject}
						className='bg-red-500 px-3 py-1 font-bold rounded-md'>
						Delete
					</button>
				)}
			</div>

			<div className='flex flex-col gap-4 h-full'>
				{getValue.map((item) => (
					<div
						key={item.id}
						className='flex flex-col gap-4 items-center'>
						<button
							onClick={() => getSubject(item.id)}
							className='bg-gray-600 px-3 py-1 rounded-md text-white font-bold'>
							{item.name}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
