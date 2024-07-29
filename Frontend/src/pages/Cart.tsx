import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../componets/cart-items";
import { Link } from "react-router-dom";


const cartItems=[
  {
    productId:"aaaa",
    photo:"data:image/jpeg;base64,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DsVNWVVWx8jnV74nva62RuRpaA2wvz5oNfhLhSPDBJHBPUPikeXsp5XNMcRJJPd2AOt+ZOyD14p4WpsRjYyfvGOhf3sU8LzHPE/7THD00PQdAgjzwO2Slnpauvr61lVHHGfaJGEx5HZmujytFnXtqb3sEGcE4IZTVza51ZV1UrKU0d6hzHDu7ggANaLWt95J3QbeCcJU1LQy0N3zxVEk73iW1yJveb4QNPvQQUfZfABA11diErKKeOeniklY6OPI7NlADRcaAXOoG1kF9UggICAgICDCDKAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDCDKAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgII3hrE21dBBVN2np4pPMEtGYHzBuPRQJJSCAgICAgICAgICAgICAgICAgICAgICDiWM9swiq5omRyPbFUTRtc3LlcGvIBGuxAUbiH7Fu0WOi/wCX1rwyCR5fFO73Ynu95r+jCdb8je+huA/QjXAgEEEEXBGoI63UjKAgICAgICAgICAgICAgICAgICAgIOYdr3aPFQwPoqSQPqpWFji03FO1w1LiP7Qg6DlueQMD83qAQXns34wxGnq4qWKrkEL3kGFwbIwDKT4Q8HLtysg/T9FIXRNc43JaCTayyHugICAgICAgICAgICAgICAgICDBQcK7ZOMsSp5xTwVb4Y5GyBwjaxjjaw98DMNzsVA4u5xJJJJJNyTqSepUDCD/2Q==",
    name:"hello",
    price:3000,
    quantity:4,
    stock:10,
  }
];
const subtotal=4000;
const tax=Math.round(subtotal *0.18);
const shippingCharges=200;
const discount=400;
const total=  subtotal+tax+shippingCharges;

const Cart = () => {

  const [couponCode,setCouponCode]=useState<string>("");
  const [isValidCouponCode,setIsValidCouponCode]=useState<boolean>(false);


useEffect( () => {
  const timeOutID =setTimeout(() => {
    if (Math.random()>0.5) setIsValidCouponCode(true);
    else setIsValidCouponCode(false)
  },1000);
  return () => {
 clearTimeout(timeOutID)
  }
}, [couponCode])




  return (
    <div className="cart">
      <main>
   {
    CartItem.length>0? cartItems.map((i,idx)=><CartItem key={idx} cartItem={i}/> ): <h1>No items added </h1>

   }
   












      </main>
      <aside> 
     <p>subtotal:₹{subtotal}</p>
     <p>shippingCharges:₹{shippingCharges}</p>
     <p>tax:₹{tax}</p>
     <p>
     Discount  - <em className="red">
     ₹{discount}
     </em>
   </p>
   <p>
     
   <b> Total:₹{total}</b>


     </p>
     <input type="text" placeholder="Coupon Code" value={couponCode} onChange={e=>setCouponCode(e.target.value)} />
      
      {
        couponCode && (
          isValidCouponCode?(
            <span className="green"> ₹{discount} off using the <code>{couponCode}</code> </span>):(
            <span className="red">Invalid Coupon  <VscError/></span>
          )
        )}
        {
          cartItems.length>0 && <Link to="/shipping" >Checkout</Link>
        }
      
      </aside>
    </div>
  )
}

export default Cart