import React, { useEffect, useState } from "react";
import match from "./matches.json";
import "./App.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import image from "./ipl.png";
import iplvideo from "./ipl.mp4";

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
        columnDefs: [
          { Width: "5%", targets: 0 },
          { Width: "5%", targets: 1 },
          { Width: "15%", targets: 2 },
          { Width: "15%", targets: 3 },
          { Width: "15%", targets: 4 },
          { Width: "15%", targets: 5 },
          { Width: "10%", targets: 6 },
          { Width: "10%", targets: 7 },
          { Width: "10%", targets: 8 },
        ],
      });
    });
  });
  return (
    <>
      <div className="topnav">
        <img src={image} alt="ipl image" />
      </div>
      <div className="video">
        {/* <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/lKKtku6CqtQ?controls=0&autoplay=1&mute=1&loop=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> */}
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
            <th>season</th>
            <th>date</th>
            <th>City</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Winner</th>
            <th>win by runs</th>
            <th>win by wickets</th>
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
            <th>win by runs</th>
            <th>win by wickets</th>
          </tr>
        </tfoot>
      </table>
      <footer class="site-footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <h6>About</h6>
              <p class="text-justify">
                The Indian Premier League (IPL), also officially known as TATA
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
