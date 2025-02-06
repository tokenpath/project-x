import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    const cookie = (await cookies()).get("auth")

    /*
     *  TEMPORARY: Authentication is temporarily disabled for development purposes.
     *  The user validation will be updated.
     */
    
    if(!cookie?.value){
        redirect(`${process.env.LOCALE_URL}/auth/signup`) 
    }

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
