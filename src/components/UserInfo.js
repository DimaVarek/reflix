export default function UserInfo({user}) {
    return (
        <div className="user-info">
            {user.name}: {user.money}$
        </div>
    )
}