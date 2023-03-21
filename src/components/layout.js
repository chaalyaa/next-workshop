import { Navbar } from "./navbar.component";

function ProductLayout(props){
    return (
        <div className={'w-full'}>

            <div className={'w-full bg-white border-b h-20'}>
                <h3>Product Layout</h3>
            </div>

            <Navbar/>

            <div className={'w-full bg-gray-100'}>
                {props?.children}
            </div>
        </div>
    )
}

export default ProductLayout;