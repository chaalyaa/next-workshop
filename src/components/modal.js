import PropTypes from 'prop-types';
import Button from './button';

function Modal(props){
    return (
        <div 
            className={
                `${props?.visible ? 'flex': 'hidden'} fixed top-0 left-0 w-full items-center justify-center bg-black bg-opacity-50 h-screen`
                }>
            
                <div className={'z-[1] relative w-2/4 h-3/4 mx-auto bg-white rounded-xl'}>
                    {props?.children}
                </div>

                <div 
                    className={'absolute top-0 left-0 z-[0] bg-black bg-opacity-50 w-full h-full'}
                    onClick={props.onChange}
                    >

                {/* <Button
                    htmlType={'button'}
                    type={'default'}
                    onClick={props.onChange}
                >Change Modal</Button> */}

            </div>
        </div>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

Modal.defaultProps = {
    visible: false,
    onChange: function(){

    }
}

export default Modal;