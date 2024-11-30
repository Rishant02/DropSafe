import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/lib/actions/user.action";
import { UserProvider } from "@/provider/UserContext";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect("/sign-in");
  return (
    <UserProvider initialUser={currentUser}>
      <main className="flex h-screen">
        <Sidebar />
        <section className="flex h-full flex-1 flex-col">
          <MobileNavigation />
          <Header />
          <div className="main-content">{children}</div>
        </section>
        <Toaster />
      </main>
    </UserProvider>
  );
};

export default Layout;
