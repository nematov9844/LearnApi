/** @format */

import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex h-screen">
            <aside className="w-1/5 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <div className="flex flex-col mt-4">
                    <Link
                        to="/crud"
                        className="text-white hover:bg-gray-600 rounded-md px-2 transition-colors duration-300 py-2"
                    >
                        Crud
                    </Link>
                </div>
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="bg-gray-800 text-white p-4">
                    <h1 className="text-2xl">Admin Panel</h1>
                </header>
                <main className="p-4 h-full bg-gray-500">
                    <Outlet />
                </main>

                <footer className="bg-gray-800 text-white p-4">
                    <p>&copy; 2025 Admin Panel. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
