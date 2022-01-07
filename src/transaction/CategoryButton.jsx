function CategoryButton(props) {

  function handleCategoryButtonClick() {
    props.setSelectedCategoryID(props.categoryID);
  }

  let categoryButton;
  if (props.isSelected) {
    categoryButton = (
      <button className="border-4 w-16 h-10 rounded-full border-cyan-300" onClick={handleCategoryButtonClick}>
        <span className="material-icons-round text-cyan-300 text-2xl">{props.iconName}</span>
      </button>
    )
  } else {
    categoryButton = (
      <button className="border-2 w-16 h-10 rounded-full" onClick={handleCategoryButtonClick}>
        <span className="material-icons-round text-cyan-300 text-2xl">{props.iconName}</span>
      </button>
    )
  }

  return (
    <div className="flex flex-col pl-2 pr-2 mt-2">
      {categoryButton}
      <span className="text-sm">{props.label}</span>
    </div>
  )
}

export default CategoryButton;