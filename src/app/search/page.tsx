// import SearchPage from "../../search/index";

import dynamic from "next/dynamic";
const SearchPage = dynamic(() => import("../../search/index"), { ssr: false });

const Searchroute = () => {
    return (
        <div>
            <SearchPage />
        </div>
    )
}
export default Searchroute