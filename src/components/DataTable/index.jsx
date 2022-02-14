import React from "react";

import "./style/style.scss";

const DataTable = ({ apiData, symbolsArr, markPrice }) => {
  return (
    <div className="datatable-wrapper">
      <table className="datatable">
        <thead>
          <tr>
            <th width="20%">Symbol</th>
            <th width="40%">Description</th>
            <th width="20%">Underlying Asset</th>
            <th width="20%">Mark Price</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map(({ id, symbol, description, underlying_asset }) => {
            return (
              <tr key={id}>
                <td>{symbol}</td>
                <td> {description} </td>
                <td> {underlying_asset.symbol} </td>
                <td>{markPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
