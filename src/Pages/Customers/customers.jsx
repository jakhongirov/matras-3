import "./customers.scss";

// React Components
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../Context/SearchContext";
import useAuth from "../../Hooks/useAuth";
import port from "../../assets/config";

// Components
import Header from "../../Components/Header/Header";

// Images
import deleteBtn from "../../images/delete.svg";
import useFetch from "../../Hooks/useFetch";
import ModalLoading from "../../Components/ModalLoading/ModalLoading";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";

function Customers() {
  const [modalLoading, setModalLoading] = useState(false);
  const [customers, setCustomers] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");;
  const [token] = useAuth(true);

  useEffect(() => {
    fetch(`${port.url}/customers`, {
      headers: { "Content-Type": "application/json", token: token },
    })
      .then((res) => res.json())
      .then((data) => setCustomers(data.data))
      .catch((err) => console.log(err));
  }, []);

  const checkboxChange = (e) => {
    fetch(`${port.url}/updatecustomer`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        num: e.target.dataset.id - 0,
        check: e.target.checked,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          return setModalLoading(false);
        }
        setModalLoading(true);
      })
      .catch((err) => console.log(err));

  };

  const deleteBtnClick = (e) => {
    fetch(`${port.url}/deletecustomer`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        number: id - 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status == 200) {
          setModalLoading(false);
        }
      })
      .catch((err) => console.log(err));



    const deletedCustomer = customers.filter((item) => item.number !== id);
    setCustomers(deletedCustomer);
    setDeleteModal(false);
    setModalLoading(false);
  };

  // useEffect(() => {
  //   if (message !== null) {
  //     setModalLoading(false);
  //     if (method === "PUT") {
  //       window.location.reload();
  //     }
  //   }
  // }, [message, method]);

  return (
    <div>
      <Header placeholder="User" input={true} />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>sana</th>
            <th>telefon raqami</th>
            <th>Qayta aloqa</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers && customers.map((c, i) => {
            const date = c.contect_time ? c.contect_time.split(/[.T\s/]/) : "";
            return (
              <tr key={c.number} className="table_tr">
                <td>{i + 1}</td>
                <td>
                  {date[1]}-<span className="date">{date[0]}</span>
                </td>
                <td>{c.phone}</td>
                <td>
                  <div className="customers_checkbox_wrapper">
                    <label className="checkbox-container customers_checkbox-container">
                      <input
                        defaultChecked={c.feedback}
                        required
                        className="customer_input"
                        type="checkbox"
                        data-id={c.number}
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
                      data-id={c.number}
                      onClick={() => {
                        setId(c.number);
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

      <ModalLoading modalLoading={modalLoading} />
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        deleteBtnClick={deleteBtnClick}
      />
    </div>
  );
}

export default Customers;
