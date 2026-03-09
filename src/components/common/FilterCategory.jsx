import React, { useState } from 'react'

const FilterCategory = ({data}) => {
    const [selectedCategory, setSelectedCategory] = useState("All")

    const handleCategoryChange = (e) =>{
        setSelectedCategory(e.target.value)
    }

    const filterItemsByCategory = data.filter(item => {
        if (selectedCategory==="All") return true;
        
        return item.category.toLowerCase()===selectedCategory.toLowerCase();
        
    })



  return (
    <div>FilterCategory</div>
  )
}

export default FilterCategory