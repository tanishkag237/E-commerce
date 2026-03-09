import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state)=>state.auth);
  //console.log("user from profile :",user)


  if (!user) {
    return <h1>No User Found</h1>;
  }

  return (
  <div className="md:h-150 bg-custom-bg/20 flex justify-center md:p-8">

    <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">

      <h1 className="text-3xl font-bold text-custom-wine mb-8 text-center">
        USER PROFILE
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-custom-bg/40 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Full Name</p>
          <h2 className="font-semibold text-lg text-primary">
            {user?.name?.firstname} {user?.name?.lastname}
          </h2>
        </div>

        <div className="bg-custom-bg/40 p-4 rounded-xl">
          <p className="text-sm text-gray-500">User ID</p>
          <h2 className="font-semibold text-lg">{user?.id}</h2>
        </div>

        <div className="bg-custom-bg/40 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Email</p>
          <h2 className="font-semibold text-lg wrap-break-word">
            {user?.email}
          </h2>
        </div>

        <div className="bg-custom-bg/40 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Phone</p>
          <h2 className="font-semibold text-lg">
            {user?.phone}
          </h2>
        </div>

      </div>
      <div className="bg-custom-bg/40 p-6 rounded-xl mt-6">

        <p className="text-sm text-gray-500 mb-1">
          Address
        </p>

        <h2 className="font-semibold text-lg">
          {user?.address?.number},{" "}
          {user?.address?.street},{" "}
          {user?.address?.city}
        </h2>

      </div>

    </div>

  </div>
);
};

export default Profile;
