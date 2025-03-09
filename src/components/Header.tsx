import React, { useState, useEffect } from "react";
import "../headers.css";
import synergyLogo from "../assets/synergyLogo.svg";
import profile from "../assets/account.svg";
import * as XLSX from "xlsx";
import axios from "axios";
import jsonData from "../store/data.json";
// import { Dropdown, Button, Form } from "react-bootstrap";

const Header: React.FC = () => {
  const [file, setFile] = useState(null);
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFile(event.target.files[0]);
//     if (file) {
//       console.log("Excel file uploaded:", file.name);
//     }
//   };

  //   const handleFileRead = async () => {
  //     if (!file) {
  //       alert("Please upload an Excel file first!");
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onload = async (e) => {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: "array" });

  //       for (const sheetName of workbook.SheetNames) {
  //         const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  //         let BASE_URL = `http://localhost:5000/${sheetName}`;
  //         let objData = [];
  //         console.log(sheetData);
  //         for (let i = 0; i < sheetData.length; i++) {
  //           objData.push(sheetData[i]);
  //         }
  //         // if(sheetName == 'Stores'){
  //         //   // console.log(sheetData)
  //         //   let StoresNew ={}
  //         //   console.log(sheetData)
  //         //   for(let i=0;i<sheetData.length;i++){
  //         //     StoresNew[sheetData[i]['ID']] = sheetData[i]
  //         //   }
  //         //   await addStoreItem(BASE_URL,StoresNew);
  //         //   console.log(StoresNew)
  //         // }
  //         // if(sheetName == 'SKUs'){
  //         //   let StoresNew ={}
  //         //   console.log(sheetData)
  //         //   for(let i=0;i<sheetData.length;i++){
  //         //     StoresNew[sheetData[i]['ID']] = sheetData[i]
  //         //   }
  //         //   await addStoreItem(BASE_URL,StoresNew);
  //         //   console.log(StoresNew)
  //         // }
  //         // if(sheetName == 'Planning'){
  //         //   let StoresNew ={}
  //         //   for(let i=0;i<sheetData.length;i++){
  //         //     StoresNew[`${sheetData[i]['Store']}_${sheetData[i]['SKU']}_${sheetData[i]['Week']}`] = sheetData[i]
  //         //   }
  //         //   await addStoreItem(BASE_URL,StoresNew);
  //         // }
  //         // if(sheetName == 'Calculations'){
  //         //   let StoresNew ={}
  //         //   for(let i=0;i<sheetData.length;i++){
  //         //     StoresNew[`${sheetData[i]['Store']}_${sheetData[i]['SKU']}_${sheetData[i]['Week']}`] = sheetData[i]
  //         //   }
  //         //   console.log(sheetData)
  //         //   await addStoreItem(BASE_URL,StoresNew);
  //         // }
  //         // if(sheetName == 'Calendar'){
  //         //   let StoresNew ={}
  //         //   for(let i=0;i<sheetData.length;i++){
  //         //     StoresNew[`${sheetData[i]['Month']}_${sheetData[i]['Week']}`] = sheetData[i]
  //         //   }
  //         //   console.log(sheetData,StoresNew)
  //         //   await addStoreItem(BASE_URL,StoresNew);
  //         // }
  //         // if(sheetName == 'Chart'){
  //         //   let StoresNew ={}
  //         //   for(let i=0;i<sheetData.length;i++){
  //         //     StoresNew[`${sheetData[i]['Week']}`] = sheetData[i]
  //         //   }
  //         //   console.log(sheetData,StoresNew)
  //         //   await addStoreItem(BASE_URL,StoresNew);
  //         // }
  //       }

  //       alert("Data successfully uploaded to Firebase in batches!");
  //     };

  //     reader.readAsArrayBuffer(file);
  //   };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      <div className="header-container">
        <div className="s-logo">
          <img className="s-logo-img" src={synergyLogo} alt="synergy-Logo" />
        </div>
        <div className="project-title">
          <h1>Data Viewer App</h1>
        </div>
        <div className="profile-dropdown">
          <img src={profile} alt="" srcset="" />
        </div>
      </div>

      {/* <div>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <button onClick={handleFileRead}>Import Data</button>
      </div> */}
    </>
  );
};

export default Header;
