import useAuth from "../hooks/useAuth";

export default function DashBoard() {
    const { user, loading } = useAuth()

    return (
        <>
            <h1>DashBoard</h1>
            {loading ? 'Loading...' : user.email}
        </>
    )
};