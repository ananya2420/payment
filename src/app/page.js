import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PaymentPage from "./payment/page";

export default function Home() {
  return (
    <div>
      <Navbar />
      <PaymentPage />
      <Footer />
    </div>
  );
}
