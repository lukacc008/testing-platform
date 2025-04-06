const UserCard = ({ user }) => {
    if (!user) return null;
  
    return (
      <div className="fixed top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg flex items-center gap-3">
        <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
        <div>
          <p className="text-white font-semibold">{user.username}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>
    );
  };
  