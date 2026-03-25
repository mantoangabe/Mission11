import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import BookList from "../components/BookList";
import CartSummary from "../components/CartSummary";

function BookPage(){
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    return (
    <>
    <div className="container mt-4">
        <CartSummary />
      <div className='row'>
        <div className='col-md-3'>
          <CategoryFilter selectedCategories={selectedCategories} onCheckboxChange={setSelectedCategories} />
        </div>
        <div className='col-md-9'>
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
    </>
  )
}
export default BookPage;