import { BrowserRouter, Route, Routes } from "react-router-dom";
import Teste from "../pages/Teste";
import LivrosCadastrados from "../pages/LivrosCadastrados";

const Paths = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/*<Route path={'/'} element={<PageLayout />}>*/}
                    {/*<Route index element={<Home />} />*/}
                    <Route path={'/t'} element={<Teste />}/>
                    <Route path={'/LivrosCadastrados'} element={<LivrosCadastrados />}/>
                    {/*</Route>*/}
                    {/*<Route path={'*'} element={<NotFound />} />*/}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Paths