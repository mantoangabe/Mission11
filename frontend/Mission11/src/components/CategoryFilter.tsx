import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  onCheckboxChange,
  selectedCategories,
}: {
  onCheckboxChange: (categories: string[]) => void;
  selectedCategories: string[];
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Book/GetCategories'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value)
      : [...selectedCategories, target.value];
    onCheckboxChange(updatedCategories);
  }

  return (
<div className="card">
  <div className="card-body">
    <h5 className="card-title">Categories</h5>

    {categories.map((category) => (
      <div key={category} className="form-check mb-2 text-start">
        <input
          type="checkbox"
          id={category}
          value={category}
          className="form-check-input"
          onChange={handleCheckboxChange}
          checked={selectedCategories.includes(category)}
        />
        <label className="form-check-label" htmlFor={category}>
          {category}
        </label>
      </div>
    ))}
  </div>
</div>

  );
}

export default CategoryFilter;
