import { Result } from "postcss";
import {useEffect, useState} from "react"

export default function ProductList(){
    const [ data, setData ] = useState( [] )
    const [ loading, setLoading ] = useState( false )
    const [ visible, setVisible ] = useState( false )

    // Note: Fetch data from client side, usually when there's a condition from the client side to fulfill
    useEffect( ()=>{
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts') 
            .then((res) => res.json())
            .then((result)=>{
                // console.log(result)
                setTimeout(()=>{
                    setData(result);
                    setLoading(false);
                }, 4000)

                clearTimeout();
            })
            .catch((err)=>{
                console.log(`[Error]\nCaused: ${err.message}`)
                setLoading(false);
            })
    }, [])

    console.log(loading, 'LOADING');

    return (
        <div>
            <h1>Product List</h1>
            {
                loading ? 'LOADING....'
                :
                data.map((item)=> {
                    return (
                        <div>
                            <p>User ID : {item.userId}</p>
                            <p>ID : {item.id}</p>
                            <p>title : {item.title}</p>
                            <p>body : {item.body}</p>
                            
                        </div>
                        
                    )
                })
            }
            
        </div>

       
    )
}