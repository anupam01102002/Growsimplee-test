import React, { useEffect, useState } from "react";
import match from "./matches.json";
import "./App.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

function App() {
  const [data, setData] = useState(match);
  useEffect(() => {
    $(document).ready(function () {
      $("#example tfoot tr th ").each(function () {
        var title = $(this).text();
        $(this).html(
          '<input type="text" placeholder="Search ' + title + '" />'
        );
      });

      // DataTable
      var table = $("#example").DataTable({
        initComplete: function () {
          // Apply the search
          this.api()
            .columns()
            .every(function () {
              var that = this;

              return $("input", this.footer()).on(
                "keyup change clear",
                function () {
                  if (that.search() !== this.value) {
                    that.search(this.value).draw();
                  }
                }
              );
            });
        },
        bDestroy: true,
      });
    });
  });
  return (
    <>
      <table id="example" className="table table-hover table-bordered cell-border">
        <thead>
          <tr>
            <th>ID</th>
            <th>season</th>
            <th>date</th>
            <th>City</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Winner</th>
            <th>win_by_runs</th>
            <th>win_by_wickets</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, id) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.season}</td>
                <td>{item.date}</td>
                <td>{item.city}</td>
                <td>{item.team1}</td>
                <td>{item.team2}</td>
                <td>{item.winner}</td>
                <td>{item.win_by_runs}</td>
                <td>{item.win_by_wickets}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>ID</th>
            <th>season</th>
            <th>date</th>
            <th>City</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Winner</th>
            <th>win_by_runs</th>
            <th>win_by_wickets</th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default App;
