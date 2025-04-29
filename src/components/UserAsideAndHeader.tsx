import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, LogOut } from "lucide-react";
import Image from "next/image";

type prop = {
  openAside?: boolean;
};

const UserAsideAndHeader: React.FC<prop> = ({ openAside }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const takeUser = async () => {
      const res = await fetch("/api/auth/searchUser", {credentials: "include"});
      const userLoged = await res.json()
      setUser(userLoged);
    };

    takeUser();
  }, []);

  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    setIsloading(true);
    await fetch("/api/auth/logout");

    router.push("/login");
  };

  return (
    <div className="px-5 py-10 border-t-2 border-gray-400 flex items-center justify-between w-full">
      {user?.avatar && (
        <Image
          src={user?.avatar}
          width={48}
          height={48}
          quality={100}
          alt="Avatar"
          className="w-12 h-12 rounded-lg"
        />
      )}
      <div
        className={`${
          openAside ? "lg:ml-3 lg:w-full" : "lg:w-0 lg:ml-0"
        } ml-3 w-full overflow-hidden flex justify-between`}
      >
        <div className={`flex flex-1`}>
          <div className="flex flex-col w-[150px] overflow-hidden">
            <span className="text-sm truncate ">{user?.FTwoNames}</span>
            <span className="text-xs truncate ">{user?.email}</span>
          </div>
        </div>

        <div
          className="text-black cursor-pointer p-3 bg-gray-50 hover:bg-gray-100  rounded-lg transition-all ml-3 flex-shrink-0"
          onClick={handleLogout}
          title="Sair"
        >
          {isLoading ? (
            <LoaderCircle className="text-black animate-spin" />
          ) : (
            <LogOut />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAsideAndHeader;
