import PropTypes from 'prop-types'

function Button(props){
    return <button 
            {...props}
            type={props?.htmlType}
            onClick={props?.onClick}
            >
            {props?.children}
        </button>
}

// Dsc: Define Button class properties
Button.propTypes = {
    htmlType: PropTypes.oneOf(['button', 'submit']).isRequired,
    type: PropTypes.oneOf(['primary', 'default']),
    onClick: PropTypes.func.isRequired,
}

// Dsc: Define button default properties
Button.defaultProps = {
    htmlType: 'button',
    type: 'default',
    onClick: function(events){
        console.log(events);
    }
}

export default Button

