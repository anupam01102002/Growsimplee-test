import React, { useEffect, useState } from "react";
import match from "./matches.json";
import "./App.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import image from "./ipl.png";
import iplvideo from "./ipl.mp4";
import {Bar} from "react-chartjs-2"

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
      $("#example").DataTable({
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
        // scrollX: true,
        
      });
    });
  });
  return (
    <>
      <div className="topnav">
        <img src={image} alt="ipl image" />
      </div>
      <div className="video">
        <video autoPlay muted loop>
          <source src={iplvideo} type="video/mp4" />
        </video>
      </div>
      
      <table
        id="example"
        className="table table-hover table-bordered cell-border display compact"
        width="100%"
      >
        <thead>
          <tr>
            <th style={{ width: "50%" }}>ID</th>
            <th>Season</th>
            <th>Date</th>
            <th>City</th>
            <th>Venue</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Toss Winner</th>
            <th>Toss Decision</th>
            <th>Winner</th>
            <th>Player of the Match</th>
            <th>Win by runs</th>
            <th>Win by wickets</th>
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
                <td>{item.venue}</td>
                <td>{item.team1}</td>
                <td>{item.team2}</td>
                <td>{item.toss_winner}</td>
                <td>{item.toss_decision}</td>
                <td>{item.winner}</td>
                <td>{item.player_of_match}</td>
                <td>{item.win_by_runs}</td>
                <td>{item.win_by_wickets}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>ID</th>
            <th>Season</th>
            <th>Date</th>
            <th>City</th>
            <th>Venue</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Toss Winner</th>
            <th>Toss Decision</th>
            <th>Winner</th>
            <th>Player of the Match</th>
            <th>Win by runs</th>
            <th>Win by wickets</th>
          </tr>
        </tfoot>
      </table>
      <footer class="site-footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <h2>About</h2>
              <p class="text-justify">
                The Indian Premier League (IPL), also officially known as VIVO
                IPL for sponsorship reasons is a professional men's Twenty20
                cricket league, contested by ten teams based out of ten Indian
                cities.The league was founded by the Board of Control
                for Cricket in India (BCCI) in 2007. It is usually held between
                March and May of every year and has an exclusive window in the
                ICC Future Tours Programme.
              </p>
            </div>
          </div>
          <hr></hr>
        </div>
      </footer>
    </>
  );
}
export default App;
