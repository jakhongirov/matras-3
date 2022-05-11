import "./ProductBtn.scss";

const ProductBtn = ({ btn, setCategoryId, categoryId }) => {
  const handleClicBtn = () => {
    setCategoryId(btn.id);
  };
  return (
    <li
      className={categoryId === btn.id ? "list list-active" : "list "}
      onClick={handleClicBtn}
    >
      <span>{btn.title}</span>
    </li>
  );
};

export default ProductBtn;
