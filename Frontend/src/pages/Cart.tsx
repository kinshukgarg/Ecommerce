const cartItems=[];
const subtotal=4000;
const tax=Math.round(subtotal *0.18);
const shippingCharges=200;
const total=  subtotal+tax+shippingCharges;

const Cart = () => {
  return (
    <div className="cart">
      <main></main>
      <aside> 
     <p>subtotal:₹{subtotal}</p>
     <p>shippingCharges:₹{shippingCharges}</p>
     <p>tax:₹{tax}</p>
     <p></p>
      
      
      </aside>
    </div>
  )
}

export default Cart