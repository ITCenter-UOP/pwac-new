import React from 'react'

const ManageNews = () => {
    const { auth } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchallnews = async () => {
            try {
                const res = await API.get(`/admin/get-all-users?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (res.data?.success && Array.isArray(res.data.result)) {
                    setUsers(res.data.result);
                } else {
                    setUsers([]);
                }
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Could not load users");
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchallnews();
    }, [token]);
    return (
        <div>ManageNews</div>
    )
}

export default ManageNews