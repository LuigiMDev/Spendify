import React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

type prop = {
  openAside?: boolean;
};

const UserAsideAndHeader: React.FC<prop> = ({ openAside }) => {

  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout")

    router.push("/login")
  };

  return (
    <div className="px-5 py-10 border-t-2 border-gray-400 flex items-center justify-between w-full">
      {/* {authUser?.avatar && (
        <Image
          src={authUser?.avatar}
          width={40}
          height={40}
          alt="Avatar"
          className="w-12 h-12 rounded-lg"
        />
      )} */}
      <div className={`${
            openAside ? "lg:ml-3 lg:w-full" : "lg:w-0 lg:ml-0"
          } ml-3 w-full overflow-hidden text-nowrap flex justify-between`}>
        <div
          className={`flex`}
        >
          <div className="flex flex-col">
            {/* <span className="text-sm">{authUser?.name}</span>
            <span className="text-xs">{authUser?.email}</span> */}
          </div>
        </div>

        <div
          className="text-black cursor-pointer p-3 bg-gray-50 hover:bg-gray-100  rounded-lg transition-all ml-3"
          onClick={handleLogout}
        >
          <LogOut />
        </div>
      </div>
    </div>
  );
};

export default UserAsideAndHeader;
