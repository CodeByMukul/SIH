import { useEffect,useRef } from "react";

export default function UploadWidget(){
    const cloudinaryRef=useRef();
    const widgetRef=useRef();
    useEffect(()=>{
        cloudinaryRef.current=window.cloudinary;
        widgetRef.current=cloudinaryRef.current.createUploadWidget({
            cloudName:'dillvpltk',
            uploadPreset:'tttest'
        },function(error,result){
            console.log(result)
        })
    },[])
    return(
        <button onClick={()=>widgetRef.current.open()}>Submit</button>
    )
}
