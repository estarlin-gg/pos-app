import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const MainLayout = () => {
  return (
    <>
      <main className=" h-screen overflow-hidden no-scrollbar w-screen bg-white ">
        <Header />
        <section className="w-full lg:px-4 h-[92vh] overflow-hidden no-scrollbar ">
          <Outlet />
        </section>
      </main>
    </>
  );
};
