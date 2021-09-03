import React, { useEffect, useState } from "react";
import Axios from "axios";
function SearchResult() {
  const [userDetailsList, setUserDetailsList] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:4001/deladmin/pages/searchAccounts").then(
      (response) => {
        for (let i = 0; i < response.data.length; i++) {
          setUserDetailsList(response.data);
          let users = response.data[i];
          if (userId === users.userid) {
            console.log("success")
          }
        }
      }
    );
  }, [userId]);
  return (
    <div>
      <div>
        <table>
          <tr>
            <th className="search-result">Full Name </th>
            <th>User ID</th>
            <th>Telephone Number</th>
            <th>Business Name</th>
            <th>Estimating ID or Enterprise ID</th>
            <th>User Type</th>
            <th>Email Address</th>
            <th>Status</th>
            <th>ZIP/Postal Code</th>
          </tr>
        </table>
      </div>
      {userDetailsList.map((value) => {
        return (
          <div className="search-result">
            <a href="http://localhost:4000/deladmin/pages/validateAccount">
              {value.userid}
            </a>
            {value.fullname} {value.telephonenumber} {value.businessname}{" "}
            {value.estidorentid} {value.usertype} {value.emailid} {value.status}{" "}
            {value.zip}
          </div>
        );
      })}
    </div>
  );
}
export default SearchResult;
