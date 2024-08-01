import { useState } from "react";
import ProductCard from "../componets/product-card";

const Search = () => {
   const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

 const addToCartHandler=()=>  {};

 const isPrevPage=true;
 const isNextPage=true;





  return (
    <div className="product-search-page">
      <aside>
        <h2>filter</h2>
        <div> 
          <h4>sort</h4>
          <select value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (low to high)</option>
            <option value="dsc">Price (high to low)</option>
          </select>
        </div>


        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>



      

 <div> 
          <h4>Category</h4>
          <select value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="asc">Sample 1</option>
            <option value="dsc">Sample 2</option>
          </select>
        </div>









      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="search by name" value={search} onChange={e=>setSearch(e.target.value)} />

    <div className="search-product-list">
       <ProductCard 
       
       productId="asds"
       name="apple"
       price={4545}
       stock={435}
       handler={addToCartHandler}
       photo="data:image/jpeg;base64,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"
       
       
       
       /></div>

       <article>
        <button disabled={!isPrevPage} onClick={()=>setPage(prev=>prev-1)}>Prev</button>
        <span>{page} of {4} </span>
        <button  disabled={!isNextPage} onClick={()=>setPage(prev=>prev+ 1)}>Next</button>
       </article>



      </main>
    </div>
  );
};

export default Search;
