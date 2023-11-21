import { useContext, useEffect, useState } from 'react'

import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false)
    const cartCtx = useContext(CartContext)
    const {items} = cartCtx

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0) //reduce transforms an array into a single value, 1st arg is a function, second one is a starting value
    
    
    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`

    useEffect(() => {
        if(items.length === 0){
            return
        }
        setButtonIsHighlighted(true)
        const timer = setTimeout(() => {
            setButtonIsHighlighted(false)
        },300)

        return () => {clearTimeout(timer)} //return a cleanup function
    }, [items]) //pass an effect function with arraay of dependencies

    return(
        <button className={btnClasses} onClick={props.onClick}> {/* we have to use onClick propert since this is a built in button, and pass onCclick from the header custom onClick  */}
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton