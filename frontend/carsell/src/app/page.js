import Image from "next/image";
import Login from "./login/page";
import { AuthProvider } from "./auth/authContext";

export default function Home() {
  return (
    <main>
      <div>
        <AuthProvider>

        <Login/>

        </AuthProvider>

       

       
          </div>
    </main>
  );
}
