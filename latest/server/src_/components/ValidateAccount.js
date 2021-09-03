import Axios from "axios";
import React, { useEffect, useState } from "react";
function ValidateAccount() {
  const [caller, callerDetails] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:4001/deladmin/pages/validateAccount").then(
      (response) => {
        console.log(response.data);
        callerDetails(response.data);
      }
    );
  }, []);
  return (
    <div>
      <form>
        <section>
          <br />
          <table border="2">
            <tr>
              <h1>Validate Caller</h1>
              {caller.map((value) => {
                return (
                  <div>
                    <table>
                      <tr>
                        <label>Caller Name: </label> {value.fullname}
                        <label> Business Name:</label> {value.businessname}
                        <label> Phone Number:</label> {value.telephonenumber}
                      </tr>
                    </table>
                  </div>
                );
              })}
            </tr>
            <tr align="middle">
              <button>NEW CALL</button>&nbsp;
              <button>SKIP</button>
            </tr>
          </table>
        </section>
        <section>
          <table>
            <tr>
              <label>Security Questions</label>
            </tr>
            <tr>
              <p word-wrap="normal">
                To verify your identity and to protect the confidentiality of
                your account information, I am going to ask you the questions
                that you selected when you registered for access.
              </p>
              <tr>
                Security Question #1 : What was your favorite childhood
                vacation?
              </tr>
              <tr>Security Answer #1 : Home</tr>
            </tr>
          </table>
        </section>
        <section>
          <tr>
            <label>
              <b>Business Administration</b>
            </label>
          </tr>
          <div>
            <table>
              <tr>
                <th className="search-result">Full Name </th>
                <th>User ID</th>
                <th>Telephone Number</th>
                <th>Email Address</th>
              </tr>
            </table>
            <div>
              {caller.map((value) => {
                return (
                  <div className="search-result">
                    <table>
                      <tr>
                        <td>{value.fullname}</td>
                        <td>{value.userid}</td>
                        <td>{value.telephonenumber}</td>
                        <td>{value.emailaddress}</td>
                      </tr>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
export default ValidateAccount;
