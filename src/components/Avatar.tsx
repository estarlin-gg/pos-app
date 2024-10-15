import { useAuth } from "../context/AuthProvider";

export const Avatar = () => {
  const { credentials } = useAuth();
  return (
    <div className="flex gap-3 px-4 items-center">
      <div className="avatar placeholder">
        <div className="bg-gray-500 text-neutral-content w-8 rounded-full">
          <span className="text-xs capitalize">{credentials?.email?.slice(0,1)}</span>
        </div>
      </div>
      <div className="space-y-1 ">
        <span className="dark:text-white text-sm font-medium block ">
          {credentials?.email}
        </span>
        <span className="dark:text-slate-300 block text-xs ">
          {credentials?.uid}
        </span>
      </div>
    </div>
  );
};
