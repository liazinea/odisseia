import { Outlet, useLocation } from "react-router-dom";
import styles from "./index.module.scss";

const PageLayout = () =>{

    document.body.classList.add('background-main');

    return(
        <>
            <main role="main" className={`${styles.main}`}>
                <Outlet/>
            </main>
        </>
    );
}

export default PageLayout