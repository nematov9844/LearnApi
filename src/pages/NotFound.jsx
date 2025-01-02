/** @format */

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
	return (
		<div className='flex justify-center items-center h-screen bg-gray-900'>
			<motion.div
				className='text-center text-white'
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, ease: "easeOut" }}>
				<motion.h1
					className='text-6xl font-extrabold'
					initial={{ x: -100 }}
					animate={{ x: 0 }}
					transition={{ duration: 1, type: "spring", stiffness: 100 }}>
					404
				</motion.h1>
				<motion.p
					className='text-2xl mt-4'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 1 }}>
					Page Not Found
				</motion.p>
				<motion.div
					className='mt-6'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 1 }}>
					<button onClick={()=>navigate("/crud")} className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none'>
						Go Back Home
					</button>
				</motion.div>
			</motion.div>
		</div>
	);
}
