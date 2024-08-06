import React, { useRef } from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
const DataTable = ({
  data,
  handleDelete,
  onSearch,
  sortA,
  sortZ,
  sortQtyInc,
  sortQtyDec,
  sortPriceInc,
  sortPriceDec,
  grandTotal,
  vat,
  netTotal,
}) => {
  const sRef = useRef();
  const handleSearch = () => {
    const keyword = sRef.current.value;
    onSearch(keyword);
  };
  return (
    <Container>
      <input type="text" placeholder="search..." ref={sRef} />
      <Button onClick={handleSearch}>Search</Button>
      <Button onClick={sortA}>A</Button>
      <Button onClick={sortZ}>Z</Button>
      <Button onClick={sortQtyInc}>QA</Button>
      <Button onClick={sortQtyDec}>QZ</Button>
      <Button onClick={sortPriceInc}>PA</Button>
      <Button onClick={sortPriceDec}>PZ</Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.quantity * item.price}</td>
              <td>
                <i class="bi bi-trash" onClick={() => handleDelete(index)}></i>{" "}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">Gross Price: </td>
            <td>{grandTotal}</td>
          </tr>
          <tr>
            <td colSpan="4">VAT: </td>
            <td>{vat.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="4">Net Price: </td>
            <td>{netTotal}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default DataTable;
