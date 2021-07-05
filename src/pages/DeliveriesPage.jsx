import React, { useEffect, useState } from "react";

const DeliveriesPage = () => {
  return (
    <div>
      <table width="100%">
        <thead>
          <th>Name</th>
          <th>Address</th>
          <th>pincode</th>
          <th>delivery status</th>
        </thead>
        <tbody>
            <tr>
                <td>Satyam Bora</td>
                <td>qweer as d sac as</td>
                <td>414113</td>
                <td>Not Delivered</td>
            </tr>
            <tr>
                <td>Satyam Bora</td>
                <td>qweer as d sac as</td>
                <td>414113</td>
                <td>Not Delivered</td>
            </tr>
            <tr>
                <td>Satyam Bora</td>
                <td>qweer as d sac as</td>
                <td>414113</td>
                <td>Not Delivered</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DeliveriesPage;
