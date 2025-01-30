import BooksTable from "../components/BooksTable";

const AdminPage = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-muted-black mb-6">Admin Dashboard</h1>

            <div className="bg-gray-800 p-4 rounded-md shadow-md">
                <h2 className="text-2xl text-white mb-4">Manage Books</h2>
                <BooksTable />
            </div>
        </div>
    );
};

export default AdminPage;
