'use client'
import { store } from "@/redux/store";
import { Provider } from "react-redux";

function ProviderComp(children){
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ProviderComp;