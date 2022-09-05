import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillPhoneFill } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import Loader from "../Loader/Loader";
import "../css/main.css";

function Dropdown() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const effectFun = async () => {
      await axios
        .get("https://dinfo.droid-ng.eu.org/get.php")
        .then((response) => {
          const deviceArray = [];
          // eslint-disable-next-line
          response.data.data.map((device) => {
            axios
              .get(
                `https://ota.droid-ng.eu.org/v1.php?device=${device.codename}&type=release&incr=null`
              )
              .then((res) => {
                const deviceObj = {
                  device: device.name,
                  codename: device.codename,
                  oem: device.oem,
                  maintainer: device.maintainer,
                  data: res.data,
                };
                deviceArray.push(deviceObj);
                if (deviceArray.length === response.data.data.length) {
                  setData(deviceArray);
                  setLoaded(true);
                }
              })
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));
    };
    effectFun();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="dropdown">
      {loaded ? null : <Loader />}
      {data.map((data, index) => (
        <div className="device-box" key={index}>
          <div className="main-data">
            <button
              className="btn"
              onClick={() => {
                document
                  .querySelectorAll(".device-box")
                  [index].classList.toggle("device-box-active");
                document
                  .querySelectorAll(".btn")
                  [index].classList.toggle("rotate-btn");
              }}
            >
              <AiOutlineRight size="35px" className="icon" />
            </button>
            <BsFillPhoneFill size="75px" className="icon" />
            <h1>{data.codename}</h1>
          </div>
          <div className="dropdown-data">
            <h1>Manufacturer : {data.oem}</h1>
            <h1>Device : {data.device}</h1>
            <h1>Maintained by: {data.maintainer}</h1>
            <div className="buttons">
              <button className="btn1">
                <a href={data.data.response[0].url}>Download</a>
              </button>
              <button className="btn2">
                <a
                  href={`https://ota.droid-ng.eu.org/changes.php?device=${data.codename}`}
                >
                  Changelogs
                </a>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
