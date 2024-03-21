import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"
import { useState, useEffect } from "react";


function App() {

  const initialCart= ()=>
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):[]
  

const [data]= useState(db);
const [cart, setCart]= useState(initialCart)

const MAX_ITEMS = 5
const MIN_ITEMS = 1

const addToCart=(item)=>{
  const itemExists = cart.findIndex((guitar)=>guitar.id===item.id)
  if(itemExists===-1){
    item.quantity=1
    setCart([...cart, item])

  }else if (cart[itemExists].quantity <MAX_ITEMS) {
    const updatedCart =[...cart]
    updatedCart[itemExists].quantity++
    setCart(updatedCart)
}
  
}

const removeFromCart=(id)=>{
  
  setCart(prevCart=>prevCart.filter(e=>e.id !== id))
}

const increaseQuantity=(id)=>{
  const newCart = cart.map(item=>{
    if(item.id===id && item.quantity < MAX_ITEMS){
      return{
        ...item,
        quantity: item.quantity + 1 
      }
    }
    return item
  })
  setCart(newCart);
}

const reduceQuantity=(id)=>{
  const newCart = cart.map(item=>{
    if(item.id===id && item.quantity > MIN_ITEMS){
      return{
        ...item,
        quantity: item.quantity - 1 
      }
    }
    return item
  })
  setCart(newCart);
}


const emptyCart=()=>{
  setCart([])
}

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])


  return (
    <>
      
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      reduceQuantity={reduceQuantity}
      emptyCart={emptyCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
           {data.map(guitar=>
            <Guitar
            key={guitar.id}
            guitar={guitar}
            addToCart={addToCart}
            />
            )}

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">
              GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
