
const Input = (props) =>{
    return(
        <input
            type={props.type}
            id={props.id}
            // value={enteredEmail}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.OnBlur}
          />
    )
}

export default Input;