import React, { useEffect, useState } from "react"
import Aux from "../Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {

        let [errorProp, setErrorProp] = useState({
            error: null,
        });

        useEffect(()=>{
            let reqInstance = axios.interceptors.request.use(req => {
                setErrorProp({ error: null });
                return req;
            });
    
            let resInstance = axios.interceptors.response.use(res => res, error => {
                setErrorProp({ error: error });
            });

            return ()=>{
                console.log("UseEffect cleanup");
                axios.interceptors.request.eject(reqInstance);
                axios.interceptors.response.eject(resInstance);
            };

        },[]);

        

        let errorConfirmationHalndler = () => {
            setErrorProp({ error: null });
        }

        return (
            <Aux>
                <Modal show={errorProp.error} modalClicked={errorConfirmationHalndler} >
                    {errorProp.error ? errorProp.error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}


export default withErrorHandler;