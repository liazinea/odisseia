import { Outlet, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const PageLayout = () => {
  document.body.classList.add("background-main");

  return (
    <div className={styles.principal}>
      <Navbar />
      <main role="main" className={`${styles.main}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
