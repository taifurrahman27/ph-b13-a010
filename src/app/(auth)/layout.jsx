import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";


export default function PublicLayout({ children }) {

    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}
