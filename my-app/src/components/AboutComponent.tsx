import { Route, Routes } from "react-router-dom";
import MeComponent from "./MeComponent";

const AboutComponent = () => {
    return <>
    <div>About</div>
    <Routes>
        <Route path="/me" element={<MeComponent />} />
    </Routes>
    </>
}

export default AboutComponent;