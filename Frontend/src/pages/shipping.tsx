import { ChangeEvent,useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="shipping">
      <button>
        <BiArrowBack />
      </button>
      <form>
        <h1>Shipping Address</h1>
        <input
        required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />

<input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />

        <input
          required
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />

        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value="">Choose Country</option>
          <option value="india">India</option>
        </select>

        <input
          required
          type="number"
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pincode}
          onChange={changeHandler}
        />
    
  <button type="submit">Pay now</button>



        {/* Add more inputs for city, state, country, and pincode */}
      </form>
    </div>
  );
};

export default Shipping;
