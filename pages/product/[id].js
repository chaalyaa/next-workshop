export default function ProductDetail(props){
    console.log(props)
    return(
        <h1>Product Detail {props?.id}</h1>
    )
}

// Default method next.js
export async function getServerSideProps(context){
    let { id } = context.params
    
    return {
        props: {
            id
        }
    }
}