import { Outlet, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const PageLayout = () =>{

    document.body.classList.add('background-main');

    return(
        <>
        <Navbar/>
            <main role="main" className={`${styles.main}`}>
                <Outlet/>
            </main>
            <Footer />
        </>
    );
}

export default PageLayout