const serial_number = document.getElementById("serial_number")
const title = document.getElementById("title")
const due_date = document.getElementById("due_date")
const description = document.getElementById("description")
const btnfortaskadd = document.getElementById("btnfortaskadd")

async function loadddataintable(event) {
  event.preventDefault();
  // i am goint to fetch the data from server
  let res = await fetch("http://127.0.0.1:5000/getdata", {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      uername: ""
    })    
  })

  let serResponse = await res.json(); 
  console.log(serResponse.querResult.fields)
  
  let data =serResponse.querResult;

  // Create the table element
  const table = document.createElement("table");
  table.innerHTML="";
  // Create the table header
  const headerRow = table.insertRow();
  const headerNames = ["Serial_Number", "Title", "Due_Date", "Description"];
  for (let i = 0; i < headerNames.length; i++) {
    const headerCell = headerRow.insertCell();
    headerCell.innerHTML = headerNames[i];
  }

  // Create the table rows
  for (let i = 0; i < data.length; i++) {
    const row = table.insertRow();
    for (let j = 0; j < data[i].length; j++) {
      const cell = row.insertCell();
      cell.innerHTML = data[i][j];
    }
  }

  // Add the table to the container element
  const container = document.getElementById("table-container");
  container.innerHTML=""
  container.appendChild(table);

}

window.onload = function (event) {
  loadddataintable(event)
}

async function sendDataforTask(event) {
  event.preventDefault();
  let UserGivenserial_number = serial_number.value;
  let UserGiventitle = title.value;
  let UserGivendue_date = due_date.value;
  let UserGivendescription = description.value;

  let res = await fetch("http://localhost:5000/adddata", {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      serial_number: UserGivenserial_number,
      title: UserGiventitle,
      due_date: UserGivendue_date,
      description: UserGivendescription
    })
  })
  let data = await res.json();
  /**
   * {
   *   querResult:"",
   *   msg:""
   * }
   */
 
  if (data.responseCode == 445) { 
      loadddataintable(event)
  }
  
}

btnfortaskadd.addEventListener("click", sendDataforTask)