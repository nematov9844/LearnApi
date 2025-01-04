import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import MainLayout from "./Layout/MainLayout";
import Crud from "./pages/Crud";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";

export default function App() {
	return (
		<>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route
					path='/crud'
					element={
						<PrivateRoute>
							<MainLayout />
						</PrivateRoute>
					}
				>
					<Route index path='/crud' element={<Crud />} />
				</Route>
				<Route path='*' element={<NotFound/>} />
			</Routes>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}
