import { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { SearchContext } from "../../Context/SearchContext";
import useAuth from "../../Hooks/useAuth";
import port from "../../assets/config";

// images
import deleteBtn from "../../images/delete.svg";
import x from "../../images/Vector.svg";
import "./Categories.scss";
import ModalLoading from "../../Components/ModalLoading/ModalLoading";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";

function Categories() {
  const [token] = useAuth(true);
  const [modal, setModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");


  useEffect(() => {
    fetch(`${port.url}/category`, {
      headers: { "Content-Type": "application/json", token: token },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".up_input");

    fetch(`${port.url}/newcategory`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        title: inputs[0].value,
        status: inputs[1].checked,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 201) {
          setModalLoading(false)
          setModal(false)
        } else {
          setModalLoading(true)
        }
      })
      .catch((err) => console.log(err))


  };

  const checkboxChange = (e) => {
    console.log(e.target.dataset.id);
    fetch(`${port.url}/updatecategory`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        id: e.target.dataset.id,
        check: e.target.checked,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    setModalLoading(false);
  };

  const deleteBtnClick = (e) => {
    fetch(`${port.url}/deletecategory`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status == 200) {
          setModalLoading(false);
        }
      })
      .catch((err) => console.log(err));

    const deletedCategories = categories.filter(
      (item) => item.id !== id
    );
    setCategories(deletedCategories);

    setDeleteModal(false);
    setModalLoading(false);
  };

  // useEffect(() => {
  //   if (message !== null) {
  //     setModalLoading(false);
  //     setModal(false);
  //     if (method === "PUT") {
  //       const { category } = message;
  //       const foundCategory = categories.findIndex(
  //         (c) => c.id === category.id
  //       );
  //       categories.splice(foundCategory, 1, category);
  //     }
  //   }
  // }, [categories, message, method]);

  return (
    <div>
      <Header />
      <table>
        <thead>
          <tr>
            <th>Toifalar</th>
            <th>Holat</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => {
            return (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>
                  <div className="customers_checkbox_wrapper">
                    <label className="checkbox-container customers_checkbox-container">
                      <input
                        defaultChecked={c.status}
                        className="customer_input"
                        type="checkbox"
                        data-id={c.id}
                        onChange={checkboxChange}
                      />
                      <span className="checkmark customers_checkmark">
                        <div></div>
                      </span>
                    </label>
                  </div>
                </td>
                <td>
                  <button>
                    <img
                      src={deleteBtn}
                      alt="deleteBtn"
                      data-id={c.id}
                      onClick={() => {
                        setId(c.id);
                        setDeleteModal(true);
                      }}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className="add_btn"
        onClick={() => {
          setModal(true);
        }}
      >
        Qo’shish
      </button>
      {modal ? (
        <div
          className="modal_wrapper"
          onClick={(e) =>
            e.target.classList[0] === "modal_wrapper" ? setModal(false) : ""
          }
        >
          <div className="modal category_modal">
            <h3>Qo’shish</h3>
            <form className="form" onSubmit={handleSubmit}>
              <div className="loaction_wrapper category_wrapper">
                <label htmlFor="Manzil">Kategoriya nomi</label>
                <input
                  required
                  className="up_input"
                  id="Manzil"
                  type="text"
                  placeholder="masalan: Model B"
                />
                <section>
                  <label className="checkbox-container">
                    Holat
                    <input
                      defaultChecked={true}
                      className="up_input"
                      type="checkbox"
                    />
                    <span className="checkmark">
                      <div></div>
                    </span>
                  </label>
                </section>
                <button className="addBtn category_addBtn" type="submit">
                  Qo’shish
                </button>
              </div>
            </form>
            <button className="btn_x" onClick={() => setModal(false)}>
              <img src={x} alt="x" />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <ModalLoading modalLoading={modalLoading} />
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        deleteBtnClick={deleteBtnClick}
      />
    </div>
  );
}

export default Categories;
