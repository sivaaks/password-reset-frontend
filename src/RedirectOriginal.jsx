import axios from 'axios';
import { useEffect } from 'react';
import { API_URL } from './Utils';

export default function RedirectOriginal(props){

    const link=props.match.params.link;

    const getOriginal=async(link)=>{
        await axios.get(`${API_URL}/${link}`).then(function(res){
            console.log(res.data);
           window.location.replace(res.data);   
        })
           
    }

    useEffect(()=>{
        getOriginal(link);
    },[link])

    return(
      <>
      <p>Please wait, you are being redirected...</p>
      </>
    )

}