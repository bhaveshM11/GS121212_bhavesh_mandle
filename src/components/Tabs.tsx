import "../App.css";
import React from "react";
import { useState, useCallback } from "react";
import {Planning,Stores,SKUs as skuData,Calendar as calendarData} from '../store/store.ts'
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import deleteIcon from "../assets/deleteIcon.svg";


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const tabs = ["Store", "SKU", "Planning"];


// interface Planning{
//   Store: string,
//   SKU: string,
//   Week: string,
//   Sales_Units: number
// }

// // Define a type for the object with dynamic keys
// type PlanningObj = {
//   [key: string]: Planning;
// };

// interface JsonData {
//   Planning: PlanningObj[];
// }

const App:React.FC = ()=>  {
  const [activeTab, setActiveTab] = useState("Store");
  console.log(Planning)
  const [planning, setPlanning] = useState(
    Object.values(Planning[0])
  );
  const [planningObj, setPlanningObj] = useState(
    Planning[0]
  );
  const [storesObj, setStoresObj] = useState(Stores[0]);
  const [skuObj, setSKUObj] = useState(skuData[0]);
  const [stores, setStores] = useState(Object.values(Stores[0]));
  const [SKUs, setSKUs] = useState(Object.values(skuData[0]));
  const [Calendar, setCalendar] = useState(
    Object.values(calendarData[0])
  );

  const handleDelete = useCallback(
    (id) => {
      setStores(stores.filter((store) => store.ID !== id));
    },
    [stores]
  );

  const handleDeleteSKU = useCallback(
    (id) => {
      setSKUs(SKUs.filter((sku) => sku.ID !== id));
    },
    [SKUs]
  );

  const getGMCellStyle = (value) => {
    value = value.data[value.colDef.weekType];
    
    value = value.percentage
    if (value >= 40) return { backgroundColor: "green", color: "white" };
    if (value >= 10 && value < 40)
      return { backgroundColor: "yellow", color: "white" };
    if (value >= 5 && value < 10)
      return { backgroundColor: "orange", color: "white" };
    if (value < 5) return { backgroundColor: "red", color: "white" };

    return { backgroundColor: "red", color: "white" };
  };

  const generateColumnDefs = () => {
    const months = {};
    // Group weeks under respective months
    let count = 0;
    Calendar.forEach((week) => {
      const {
        Month,
        "Month Label": monthLabel,
      } = week;

      if (!months[Month]) {
        count = 1;
        months[Month] = { monthLabel, weeks: [] };
      }

      months[Month].weeks.push({
        headerName: `Week 0${count}`,
        // flex:1,
        width: 300,
        children: [
          {
            headerName: "Sales Units",
            field: `W0${count}.Sales_Units`,
            width: 100,
            weekType: `W0${count}`,
            // type:
            editable: true,
          },
          { headerName: "Sales Dollars", field: `W0${count}.sales_dollars`, width: 100 },
          { headerName: "GM Dollars", field: `W0${count}.gm_dollars`, width: 100 },
          {
            headerName: "GM Percent",
            field: `W0${count}.gm_percentage`,
            width: 150,
            weekType: `W0${count}`,
            cellStyle: (params) => getGMCellStyle(params),
          },
        ],
      });
      count++;
    });

    return Object.keys(months).map((monthKey) => ({
      headerName: months[monthKey].monthLabel,
      // headerClass: "center-header",
      with: 1000,
      // flex:1,
      children: months[monthKey].weeks,
    }));
  };
  const columnDefs = {
    Store: [
      {
        headerName: "",
        field: "delete",
        cellRenderer: (params) => (
          <div className="deleteIcon">
            <img
              src={deleteIcon}
              alt="logo"
              onClick={() => handleDelete(params.data.ID)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ),
        width: 80,
      },
      {
        headerName: "S.No",
        rowDrag: true,
        field: "SeqNo",
        width: 80,
      },
      {
        headerName: "Store",
        field: "Label",
      },
      {
        headerName: "City",
        field: "City",
      },
      {
        headerName: "State",
        field: "State",
      },
    ],
    SKU: [
      {
        headerName: "",
        field: "delete",
        cellRenderer: (params) => (
          <div className="deleteIcon">
            <img
              src={deleteIcon}
              alt="logo"
              onClick={() => handleDeleteSKU(params.data.ID)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ),
        width: 80,
      },
      {
        headerName: "SKU",
        field: "Label",
        flex: 1,
        cellStyle: { borderRight: "2px solid #ccc" },
      },
      { headerName: "Price", field: "Price", flex: 1 / 2 },
      { headerName: "Cost", field: "Cost", flex: 1 / 2 },
    ],
    Planning: [
      {
        headerName: "Store",
        field: "store",
        width: 200,
        pinned: "left",
        lockPinned: true,
        cellStyle: { borderRight: "2px solid #ccc" },
      },
      {
        headerName: "SKU",
        field: "sku",
        width: 200,
        pinned: "left",
        lockPinned: true,
        cellStyle: { borderRight: "2px solid #ccc" },
      },
      ...generateColumnDefs(),
    ],
    Charts: [
      { headerName: "Metric", field: "metric", flex: 1 },
      { headerName: "Value", field: "value", flex: 1 },
    ],
  };

  const formatDecimal = (value) => {
    return value ? `$ ${parseFloat(value).toFixed(2)}` : "$ 0.00";
  };

  // Convert percentage to whole number
  const formatPercentage = (value) => {
    return value ? `${Math.round(value)} %` : "0 %";
  };

  const getSKUData = (skuId, unit) => {
    let data = {};
    let sku = skuObj[skuId];
    data['Sales_Units'] = unit
    data["sales_dollars"] = formatDecimal(sku["Price"] * unit);
    data["gm_dollars"] = formatDecimal(
      sku["Price"] * unit - sku["Cost"] * unit
    );
    data["gm_percentage"] = formatPercentage(
      ((sku["Price"] * unit - sku["Cost"] * unit) / (sku["Price"] * unit)) * 100
    );
    data["percentage"] =
      ((sku["Price"] * unit - sku["Cost"] * unit) / (sku["Price"] * unit)) *
      100;
    return data;
  };
  const getdefaultData = (skuId, unit) => {
    let data = {};
    data['Sales_Units'] = unit
    data["sales_dollars"] = formatDecimal(0);
    data["gm_dollars"] = formatDecimal(
      0
    );
    data["gm_percentage"] = formatPercentage(
     0
    );
    data["percentage"] = 0
    return data;
  };

  interface PlanningData {
    key: string;
    storeId: string;
    skuId: string;
    store: string;
    sku: string;
    [week: string]: any; // Dynamic keys for weekly data
  }
  

  const getPlanningData =  () => {
    let slice = planning;
    let arr: PlanningData[] = []; 
    let data: Partial<PlanningData> = {};
    for (let i = 0; i < stores.length; i++) {
      let storeId = stores[i]["ID"];
      for (let j = 0; j < SKUs.length; j++) {
        data = {};
        let SKUid = SKUs[j]["ID"];
        for(let c=0;c<Calendar.length;c++){
            let key = `${storeId}_${SKUid}_${Calendar[c]["Week"]}`
            data["key"] = key;
            data["storeId"] = stores[i]["ID"];
            data["skuId"] = SKUs[j]["ID"];
            data["store"] = stores[i]["Label"];
            data["sku"] = SKUs[j]["Label"];
            let skud = key in planningObj? getSKUData(SKUid, planningObj[key]["Sales_Units"]) : getdefaultData(SKUid,0);
            data[Calendar[c]["Week"]] = {['key']:key,...skud };
        }
        arr.push(data as PlanningData);
      }
    
    }
    return arr
  };

  const getRowData = () => {
    switch (activeTab) {
      case "Store":
        console.log(stores)
        return stores;
      case "SKU":
        console.log(SKUs)
        return SKUs;
      case "Planning":
        console.log(getPlanningData())
        return getPlanningData();
      default:
        return [];
    }
  };

  const onCellValueChanged = (params) => {
    let key = params.data[params.colDef.weekType]['key']
    if(key in planningObj){
      planningObj[key]['Sales_Units'] = params.value
      setPlanningObj((prev)=>({...prev,[key]:planningObj[key]}))
    }else{
      const [Store,SKU,Week] = key.split('_')
      let obj = {}
      obj['Store'] = Store
      obj['SKU'] = SKU
      obj['Week'] = Week
      obj['Sales_Units'] = params.value
      setPlanningObj((prev)=>({...prev,[key]:obj}))
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalSKU, setShowModalSKU] = useState(false);
  const [formData, setFormData] = useState({ Label: "", City: "", State: "", ID: "",SeqNo:stores[stores.length-1].SeqNo +1 });
  const [formDataSKU, setFormDataSKU] = useState({ Label: "", Class: "",Department : "",Price:0,Cost:0, ID: ""});

  const generateUniqueId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = letters.charAt(Math.floor(Math.random() * 26)) + letters.charAt(Math.floor(Math.random() * 26));
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Ensures 4-digit number
    return `${randomLetters}${randomNumbers}`;
  };
  const addNewRow = () => {
    setShowModal(true)
    setFormData({ ...formData, ID: `ST`+generateUniqueId(),SeqNo:stores[stores.length-1].SeqNo +1})
  };

  const addNewRowSKU = () => {
    setShowModalSKU(true)
    setFormDataSKU({ ...formDataSKU, ID: `SK`+generateUniqueId()})
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeSKU = (e) => {
    setFormDataSKU({ ...formDataSKU, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (formData.Label && formData.City && formData.State && formData.ID) {
      // setTableData([...tableData, formData]);
      setShowModal(false);
      setStores([...stores, formData]);
      setFormData({ Label: "", City: "", State: "", ID: "",SeqNo:stores[stores.length-1].SeqNo +1 });
    } else {
      alert("Please fill all fields");
    }
  };

  const handleSaveSKU = () => {
    if (formDataSKU.Label && formDataSKU.Class && formDataSKU.Department && formDataSKU.Price && formDataSKU.Cost) {
      setShowModalSKU(false);
      console.log(formDataSKU)
      let obj = {...formDataSKU}
      obj['Price'] = Number(formDataSKU.Price)
      obj['Cost'] = Number(formDataSKU.Cost)
      setSKUs([...SKUs, obj]);
      setFormDataSKU({ Label: "", Class: "",Department : "",Price:0,Cost:0, ID: ""});
    } else {
      alert("Please fill all fields");
    }
  };
  return (
    <>
      {/* <Header /> */}
      <div className="app-container">
        {/* Sidebar Tabs */}
        <div className="sidebar">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Right Side Listing */}
        <div className="content">
          <div className="ag-theme-alpine" style={{ height: 450 }}>
            <AgGridReact
              rowData={getRowData() as any} 
              columnDefs={columnDefs[activeTab]}
              rowDragManaged={true}
              animateRows={true}
              onCellValueChanged={onCellValueChanged}
            />
          </div>
          {["Store", "SKU"].includes(activeTab) && (
            <button className="create-btn" onClick={activeTab === "Store" ? addNewRow :addNewRowSKU}>
              {activeTab === "Store" ? "New Store" : "New SKU"}
            </button>
          )}
          
        </div>
        {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Store</h3>
            <input type="text" name="ID" placeholder="ID" value={formData.ID} disabled readOnly/>
            <input type="text" name="Label" placeholder="Name" value={formData.Label} onChange={handleChange} required/>
            <input type="text" name="City" placeholder="City" value={formData.City} onChange={handleChange} required/>
            <input type="text" name="State" placeholder="State" value={formData.State} onChange={handleChange} required/>
            <div className="buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showModalSKU && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add SKU</h3>
            <input type="text" name="ID" placeholder="ID" value={formDataSKU.ID} disabled readOnly/>
            <input type="text" name="Label" placeholder="Name" value={formDataSKU.Label} onChange={handleChangeSKU} required/>
            <input type="text" name="Class" placeholder="Class" value={formDataSKU.Class} onChange={handleChangeSKU} required/>
            <input type="text" name="Department" placeholder="Department" value={formDataSKU.Department} onChange={handleChangeSKU} required/>
            <input type="number" name="Price" placeholder="Price" value={formDataSKU.Price} onChange={handleChangeSKU} required/>
            <input type="number" name="Cost" placeholder="Cost" value={formDataSKU.Cost} onChange={handleChangeSKU} required/>
            <div className="buttons">
              <button onClick={handleSaveSKU}>Save</button>
              <button onClick={() => setShowModalSKU(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default App;
