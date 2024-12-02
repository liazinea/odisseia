import { BrowserRouter, Route, Routes } from "react-router-dom";
import Teste from "../pages/Teste";
import InfoLivro from "../pages/InfoLivro"

const Paths = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/*<Route path={'/'} element={<PageLayout />}>*/}
                    {/*<Route index element={<Home />} />*/}
                    <Route path={'/t'} element={<Teste />}/>
                    <Route path='/livros/' element={<InfoLivro/>}/>
                    {/*</Route>*/}
                    {/*<Route path={'*'} element={<NotFound />} />*/}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Paths