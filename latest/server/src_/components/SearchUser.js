import "../components/SearchUser.css";
import React, { useState } from "react";
import Axios from "axios";
import SearchResult from "./SearchResult";
function SearchUser() {
  const [userId, setUserId] = useState("");

  const searchUser = () => {
    Axios.get("http://localhost:4001/deladmin/pages/searchAccounts", {
      userid: userId,
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let users = response.data[i];
        if (userId === users.userid) {
          console.log(users.userid + " " + users.telephonenumber);
        }
      }
    });
  };

  return (
    <div className="search-user">
      <table>
        <b>Search User</b>
        <br />
        <label>
          Last name or User Id is required to search for a user.
          <br />
          Business name is required to search for a business.
          <br />
          Zip code and/or phone number can be used to search for user or
          business.
        </label>
        <br />
        <br />
        <div className="search-criteria">
          <b>Search Criteria</b>
        </div>
        <div>
          <table className="search-table">
            <tr>
              <td className="label-td">Last Name:&nbsp;</td>
              <input type="text" name="lastname" />
            </tr>
            <tr>
              <td className="label-td">First Name:&nbsp;</td>
              <input type="text" name="firstname" />
            </tr>
            <tr>
              <td className="label-td">E-mail address:&nbsp;</td>
              <input type="text" name="email" />
            </tr>
            <tr>
              <td className="label-td">User ID:&nbsp;</td>
              <input
                type="text"
                name="userId"
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              />
            </tr>
            <tr>
              <td className="label-td">Enterprise ID:&nbsp;</td>
              <input type="text" name="enterpriseid" />
            </tr>
            <tr>
              <td className="label-td">Business Name:&nbsp;</td>
              <input type="text" name="businessname" />
            </tr>
            <tr>
              <td className="label-td">Zip or Postal code:&nbsp;</td>
              <input type="text" name="zip" />
            </tr>
            <tr>
              <td className="label-td">Phone Number:&nbsp;</td>
              <input type="text" name="phone" />
              &nbsp;Ext:
              <td className="ext-td">
                <input type="text" size="10" name="ext" />
              </td>
            </tr>
            <tr>
              <td />
              <button onClick={searchUser}>Search</button>
              <button>Clear</button>
            </tr>
          </table>
        </div>
      </table>
      <SearchResult />
    </div>
  );
}
export default SearchUser;
