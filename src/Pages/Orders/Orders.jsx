
import { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import loading from "../../images/loading.png";
import "./Orders.scss";
import useAuth from "../../Hooks/useAuth";
import port from "../../assets/config";


function Orders() {
  const [modalLoading, setModalLoading] = useState(false);
  const [orders, setData] = useState();
  const [token] = useAuth(true);
  const [search, setSearch] = useState('')


  const checkboxChange = (e) => {

    fetch(`${port.url}/updateorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({
        check: e.target.checked,
        num: e.target.dataset.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setModalLoading(false);
          window.location.reload();
        } else {
          setModalLoading(true);
        }
      })
      .catch((err) => console.log(err))

  };

  useEffect(() => {
    if (!search) {
      fetch(`${port.url}/orders`, {
        headers: { "Content-Type": "application/json", token: token },
      })
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log(err))
    } else {
      const FindOrder = orders.filter(e => e.customer == search)
      setData(FindOrder)
    }
  }, [search])

  return (
    <div>
      <Header placeholder={"User"} input={true} setSearch={setSearch} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ismi</th>
            <th>Telefon Raqami</th>
            <th>Mahsulot Nomlari</th>
            <th>Miqdor</th>
            <th>Qayta aloqa</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((o, i) => {
            return (
              <tr key={o.number}>
                <td>{i + 1}</td>
                <td>{o.customer}</td>
                <td>{o.phone}</td>
                <td>{o.product}</td>
                <td>{o.prod_count}</td>
                <td>
                  <div className="customers_checkbox_wrapper">
                    <label className="checkbox-container customers_checkbox-container">
                      <input
                        defaultChecked={o.feedback}
                        className="customer_input"
                        type="checkbox"
                        data-id={o.number}
                        onChange={checkboxChange}
                      />
                      <span className="checkmark customers_checkmark">
                        <div></div>
                      </span>
                    </label>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* loading modal */}
      {modalLoading ? (
        <div className="loading_modal_wrapper">
          <img src={loading} alt="loading" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Orders;
