import useAuth from "../hooks/useAuth";
import Logout from "../components/Logout"

export default function DashBoard() {
    const { user, loading } = useAuth()

    return (
        <div>
            <Logout />
            <h1>DashBoard</h1>
            {loading ? 'Loading...' : user.email}
        </div>
    )
};