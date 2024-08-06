import { useState, useRef, useEffect } from "react";
import accessoryData from "./acc.json";
import DataTable from "./components/dataTable";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function App() {
  const [show, setShow] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [vat, SetVat] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const quantityRef = useRef();
  const productRef = useRef();
  const [price, setPrice] = useState(0);
  const sRef = useRef();
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    calculateGrandTotal();
  }, [filter]);
  const calculateGrandTotal = async () => {
    const total = selectItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totatVat = total * 0.07;
    setGrandTotal(total);
    SetVat(totatVat);
    setNetTotal(total + totatVat);
  };
  const handleSubmit = async (e) => {
    const product = accessoryData.find(
      (item) => item.id === parseInt(productRef.current.value)
    );

    const prevItems = selectItems.find(
      (item) => item.id === parseInt(productRef.current.value)
    );
    if (prevItems) {
      prevItems.quantity += parseInt(quantityRef.current.value);
      setSelectedItems([...selectItems]);
      setFilter([...selectItems]);
      handleClose();
      calculateGrandTotal();
      return;
    }
    const order = {
      ...product,
      quantity: parseInt(quantityRef.current.value),
    };
    setSelectedItems([...selectItems, order]);
    setFilter([...selectItems, order]);
    calculateGrandTotal();
    handleClose();
  };
  const updatePrice = (e) => {
    const selectedProduct = accessoryData.find(
      (item) => item.id === parseInt(e.target.value)
    );
    setPrice(selectedProduct.price);
  };

  const [selectItems, setSelectedItems] = useState([]);
  const handleDelete = (id) => {
    selectItems.splice(id, 1);
    setSelectedItems([...selectItems]);
    setFilter([...selectItems]);
    calculateGrandTotal();
  };

  const onSearch = (filter) => {
    setFilter(
      [...selectItems].filter((item) =>
        item.name.toLowerCase().includes(filter)
      )
    );
  };

  const sortA = () => {
    setSelectedItems(
      [...selectItems].sort((a, b) => a.name.localeCompare(b.name))
    );
    setFilter([...selectItems].sort((a, b) => a.name.localeCompare(b.name)));
  };
  const sortZ = () => {
    setSelectedItems(
      [...selectItems].sort((a, b) => b.name.localeCompare(a.name))
    );
    setFilter([...selectItems].sort((a, b) => b.name.localeCompare(a.name)));
  };

  const sortPriceInc = () => {
    setSelectedItems([...selectItems].sort((a, b) => a.price - b.price));
    setFilter([...selectItems].sort((a, b) => a.price - b.price));
  };
  const sortPriceDec = () => {
    setSelectedItems([...selectItems].sort((a, b) => b.price - a.price));
    setFilter([...selectItems].sort((a, b) => b.price - a.price));
  };
  const sortQtyInc = () => {
    setSelectedItems([...selectItems].sort((a, b) => a.quantity - b.quantity));
    setFilter([...selectItems].sort((a, b) => a.quantity - b.quantity));
  };
  const sortQtyDec = () => {
    setSelectedItems([...selectItems].sort((a, b) => b.quantity - a.quantity));
    setFilter([...selectItems].sort((a, b) => b.quantity - a.quantity));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add tems</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select ref={productRef} onChange={updatePrice}>
            {accessoryData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <br />
          Quantity: <input type="number" ref={quantityRef} defaultValue={1} />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <DataTable
        data={filter}
        handleDelete={handleDelete}
        onSearch={onSearch}
        sortA={sortA}
        sortZ={sortZ}
        sortPriceInc={sortPriceInc}
        sortPriceDec={sortPriceDec}
        sortQtyInc={sortQtyInc}
        sortQtyDec={sortQtyDec}
        grandTotal={grandTotal}
        vat={vat}
        netTotal={netTotal}
      />
    </>
  );
}

export default App;
