import React from "react";
import Preloader from "../components/common/preloader/Preloader";


export function withSuspense <WSP>(WrappedComponent:React.ComponentType<WSP>) {
    return (props:WSP) => {
        return <React.Suspense fallback={<Preloader />} >
            <WrappedComponent {...props} />
        </React.Suspense>
    };
}