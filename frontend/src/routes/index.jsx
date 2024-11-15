import { BrowserRouter, Route, Routes } from "react-router-dom";
import Teste from "../pages/Teste";

const Paths = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/*<Route path={'/'} element={<PageLayout />}>*/}
                    {/*<Route index element={<Home />} />*/}
                    <Route path={'/t'} element={<Teste />}/>
                    {/*</Route>*/}
                    {/*<Route path={'*'} element={<NotFound />} />*/}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Paths