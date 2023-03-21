import React from "react";

// Note: Fetch data from server side, before load html
export default function SSR(props){
    let { data } = props 
    return (
        <div>
            <h1>Server Side Rendering</h1>
            <p>Simulasi Server side rendering</p>

            <div className={'w-full space-y-6'}>
            {
                data.map((item)=> {
                    return (
                        <div className={'bg-gray-200'}>
                            <p>User ID : {item.userId}</p>
                            <p>ID : {item.id}</p>
                            <p>title : {item.title}</p>
                            <p>body : {item.body}</p>
                            
                        </div>
                    )
                })
                
            }
            </div>
        </div>
    )
}

export async function getServerSideProps(){
    let data = [];

    await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((response) =>{
            data = response
        })
        .catch((err)=>{
            console.log(`[Error]\nCaused: ${err.message}`)
            data = []
        })
    return {
        props: {
            data
        }
    }
}