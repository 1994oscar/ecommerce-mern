import axios from "axios";
import { useEffect, useState } from "react";

export  const useAddPaypalScript = async () => {
    const [paypalSdkReady, setPaypalSdkReady] = useState(false);
    const dispatch  = useDispatch();

  
        const {data:clientId} = await axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type= 'text/javascript';
        script.src =  `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
            setPaypalSdkReady(true);
        }
        document.body.appendChild(script);
   

    return paypalSdkReady;
}