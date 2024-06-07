function returnOptions(
  type,
  data,
  title,
  xDesc,
  yDesc,
  xStacked,
  yStacked,
  indexAxis
) {
  const options = {
    type: type,
    data: data,
    options: {
      plugins: {
        customCanvasBackgroundColor: {
          color: "white",
        },
        title: {
          display: true,
          text: title,
          color: "#2B262D",
          font: {
            size: 20,
            family: "DM Sans",
          },
        },
        tooltip: {
          titleFont: {
            size: 18,
          },
          bodyFont: {
            size: 16,
          },
        },
        legend: {
          labels: {
            color: "#2B262D",
            font: {
              size: 10,
            },
          },
        },
      },
      indexAxis: indexAxis,
      scales: {
        x: {
          stacked: xStacked,
          title: {
            display: true,
            text: xDesc,
            font: {
              size: 11,
              weight: 'bold',
            },
            padding: {
              top: 9,
            },
            color: "#2B262D",
          },
          ticks: {
            color: "#2B262D",
            font: {
              size: 10,
            },
          },
          grid: {
            color: "#C7C7CB",
          },
        },
        y: {
          stacked: yStacked,
          title: {
            display: true,
            text: yDesc,
            font: {
              size: 11,
              weight: 'bold',
            },
            padding: {
              bottom: 10,
            },
            color: "#2B262D",
          },
          ticks: {
            color: "#2B262D",
            font: {
              size: 9,
            },
          },
          grid: {
            color: "#C7C7CB",
          },
        },
      },
    },
  };

  return options;
}

const category = ["Carbonated", "Food", "Non Carbonated", "Water"];
const vmLocation = [
  "Brunswick Sq Mall",
  "EB Public Library",
  "Earle Asphalt",
  "GuttenPlans",
];
let categorySales = {};
const totalSaleFromMachine = {};
const totalTransactionsFromMachine = {};
const cashSalesFromMachine = {};
const creditSalesFromMachine = {};
const transactionOnVendingMachineEachMonth = [];
const transactionOnVendingMachineEachcategory = [];
const test = [];
const uniquePlace = [];
const uniqueDate = [];
let avgSales = [];
let myaveragevalue = null;
let arr = [true, true, true, true]
let arrCategory = [true, true, true, true]

let checkboxes = document.getElementsByClassName('checkbox-location')
for (let index = 0; index < checkboxes.length; index++) {
  checkboxes[index].addEventListener('click', () => {
    selectedCheckbox(index)
  })
  checkboxes[index].checked = true
}

let checkboxes_category = document.getElementsByClassName('checkbox-category')
for (let index = 0; index < checkboxes_category.length; index++) {
  checkboxes_category[index].addEventListener('click', () => {
    selectedCheckboxCategory(index)
  })
  checkboxes_category[index].checked = true
}

function selectedCheckboxCategory(idx) {
  arrCategory[idx] = !arrCategory[idx]
  chartCategory()
}

function chartCategory() {
  selected_category = []

  new_cat = ['Carbonated', 'Non Carbonated', 'Food', 'Water']
  for (let i = 0; i < arrCategory.length; i++) {
    if (arrCategory[i] == true){
      selected_category.push(new_cat[i])
    }
  }
    categorySalesTemp = {}
  for (let i = 0; i < selected_category.length; i++) {
    categorySalesTemp[selected_category[i]] = categorySales[selected_category[i]]
  }

  // updatepaymenttype()
  updatesalescategory(categorySalesTemp)
  updatesellingcategory(selected_category)
}

function updatesellingcategory(selected_category) {
  mysellingcategory.destroy()
  let data = {
    labels: uniquePlace,
    datasets: []
  }
  ds = []

  for (let i = 0; i < selected_category.length; i++) {
    ob = {
      label: selected_category[i],
      data: test[selected_category[i]],
    }
      ds.push(ob)
  }
  data.datasets = ds
  const config = returnOptions(
    "bar",
    data,
    "Top Selling Category Across Machine",
    "Category",
    "Location",
    true,
    true,
    "y"
  );

  mysellingcategory = new Chart(document.getElementById("sellingcategory"), config);

}
function updatesalescategory(catSales){
  mysalescategory.destroy()
  const data = {
    labels: category,
    datasets: [
      {
        label: "Total Sales",
        data: catSales,
        backgroundColor: "#033495",
        borderColor: "#033495",
        borderWidth: 1,
      },
    ],
  };

  const config = returnOptions(
    "bar",
    data,
    "Sales in each Category",
    "Category",
    "Total Sales",
    false,
    false,
    "x"
  );
  mysalescategory = new Chart(document.getElementById("salescategory"), config);

}
function selectedCheckbox(idx) {
  arr[idx] = !arr[idx]
  chart()

  selected_category = []

  new_cat = ['Brunswick Sq Mall', 'EB Public Library', 'Earle Asphalt', 'GuttenPlans']
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == true){
      selected_category.push(new_cat[i])
    }
  }
  updatepaymenttype(selected_category)
  updatepeaksales(selected_category)
}

function updatepaymenttype(selected_category) {
  newCash = {}
  newCredit = {}
  for (let i = 0; i < selected_category.length; i++) {
    newCash[selected_category[i]] =  cashSalesFromMachine[selected_category[i]];
    newCredit[selected_category[i]]=  creditSalesFromMachine[selected_category[i]];
  }
  mypaymenttype.destroy()
  
  const data = {
    labels: uniquePlace,
    datasets: [
      {
        label: "Cash",
        data: newCash,
        backgroundColor: "#6A9CFD",
        borderColor: "#6A9CFD",
        borderWidth: 1,
      },
      {
        label: "Credit",
        data: newCredit,
        backgroundColor: "#FFB8D0",
        borderColor: "#FFB8D0",
        borderWidth: 1,
      },
    ],
  };

  const config = returnOptions(
    "bar",
    data,
    "Payment Type in each Machine",
    "Location",
    "Total Transaction",
    false,
    false,
    "x"
  );
  mypaymenttype = new Chart(document.getElementById("paymenttype"), config);
}

function updatepeaksales(selected_category) {
  mypeaksales.destroy()
  const data = {
    labels: uniqueDate
  }

  ds = []

  for (let i = 0; i < selected_category.length; i++) {
    obj = {
      label: selected_category[i],
      data: transactionOnVendingMachineEachMonth[selected_category[i]]
    }
    ds.push(obj)
  }
  data.datasets = ds
  console.log('ds:', data)

  const  config = returnOptions(
    "bar",
    data,
    "Peak Sales Date",
    "Transaction Date",
    "Transaction Count",
    false,
    false,
    "x"
  );
  mypeaksales = new Chart(document.getElementById("peaksales"), config);
}

function chart() {
  myaveragevalue.destroy()
  avgSales = []
  uniquePlace.forEach((element, idx) => {
    var avg = totalSaleFromMachine[element] / totalTransactionsFromMachine[element];
    let number = arr[idx] ? avg : null
    avgSales.push(number);
  });
  const dataChart = {
    labels: uniquePlace,
    datasets: [
      {
        label: "Average Transaction",
        data: avgSales,
        borderColor: "#6A9CFD",
        backgroundColor: "#6A9CFD",
      },
    ],
  };
  const configCharrt = returnOptions(
    "line",
    dataChart,
    "Average Value of Transaction",
    "Location",
    "Avg Transaction",
    false,
    false,
    "x"
  );

  myaveragevalue = new Chart(document.getElementById("averagevalue"), configCharrt);
}

categorySales["Carbonated"] = parseFloat(0);
categorySales["Food"] = parseFloat(0);
categorySales["Water"] = parseFloat(0);
categorySales["Non Carbonated"] = parseFloat(0);

fetch("./data/Pivot_Table.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((response) => {
    response.data.map((value) => {
      const {
        Location,
        TotalSales,
        TotalTransactions,
        CashSales,
        CreditSales,
        CarbonatedSales,
        FoodSales,
        NonCarbonatedSales,
        WaterSales,
        Month,
      } = value;

      // Add unique locations
      if (!uniquePlace.includes(Location)) {
        uniquePlace.push(Location);
      }

      const [y, m] = Month.split("-");
      const date = new Date(null, m - 1);
      const monthName = date.toLocaleString("en", { month: "long" });

      // Add unique months
      if (!uniqueDate.includes(monthName)) {
        uniqueDate.push(monthName);
      }

      // Transactions by month
      if (!transactionOnVendingMachineEachMonth[Location]) {
        transactionOnVendingMachineEachMonth[Location] = {};
      }
      transactionOnVendingMachineEachMonth[Location][monthName] =
        parseFloat(TotalTransactions);

      // Sales by category
      if (!test[category[0]]) {
        test[category[0]] = {};
      }
      test[category[0]][Location] = parseFloat(CarbonatedSales);

      if (!test[category[1]]) {
        test[category[1]] = {};
      }
      test[category[1]][Location] = parseFloat(FoodSales);

      if (!test[category[2]]) {
        test[category[2]] = {};
      }
      test[category[2]][Location] = parseFloat(NonCarbonatedSales);

      if (!test[category[3]]) {
        test[category[3]] = {};
      }
      test[category[3]][Location] = parseFloat(WaterSales);

      // Total sales by location
      totalSaleFromMachine[Location] =
        (totalSaleFromMachine[Location] || 0) + parseFloat(TotalSales);
      totalTransactionsFromMachine[Location] =
        (totalTransactionsFromMachine[Location] || 0) +
        parseInt(TotalTransactions);

      // Cash and credit sales by location
      cashSalesFromMachine[Location] =
        (cashSalesFromMachine[Location] || 0) + parseFloat(CashSales);
      creditSalesFromMachine[Location] =
        (creditSalesFromMachine[Location] || 0) + parseFloat(CreditSales);

      // Sales by category
      categorySales["Carbonated"] += parseFloat(CarbonatedSales);
      categorySales["Food"] += parseFloat(FoodSales);
      categorySales["Water"] += parseFloat(WaterSales);
      categorySales["Non Carbonated"] += parseFloat(NonCarbonatedSales);
    });

    // Calculate average sales per transaction by location
    uniquePlace.forEach((element, idx) => {
      var avg = totalSaleFromMachine[element] / totalTransactionsFromMachine[element];
      let number = arr[idx] ? avg : null
      avgSales.push(number);
    });

    const dataaveragevalue = {
      labels: uniquePlace,
      datasets: [
        {
          label: "Average Transaction",
          data: avgSales,
          borderColor: "#6A9CFD",
          backgroundColor: "#6A9CFD",
        },
      ],
    };

    const datapaymenttype = {
      labels: uniquePlace,
      datasets: [
        {
          label: "Cash",
          data: cashSalesFromMachine,
          backgroundColor: "#6A9CFD",
          borderColor: "#6A9CFD",
          borderWidth: 1,
        },
        {
          label: "Credit",
          data: creditSalesFromMachine,
          backgroundColor: "#FFB8D0",
          borderColor: "#FFB8D0",
          borderWidth: 1,
        },
      ],
    };

    const datasalescategory = {
      labels: category,
      datasets: [
        {
          label: "Total Sales",
          data: categorySales,
          backgroundColor: "#033495",
          borderColor: "#033495",
          borderWidth: 1,
        },
      ],
    };

    const datapeaksales = {
      labels: uniqueDate,
      datasets: [
        {
          label: "Brunswick Sq Mall",
          data: transactionOnVendingMachineEachMonth["Brunswick Sq Mall"],
          backgroundColor: "#6A9CFD",
          borderColor: "#6A9CFD",
          borderWidth: 1,
        },
        {
          label: "EB Public Library",
          data: transactionOnVendingMachineEachMonth["EB Public Library"],
          backgroundColor: "#FFB8D0",
          borderColor: "#FFB8D0",
          borderWidth: 1,
        },
        {
          label: "Earle Asphalt",
          data: transactionOnVendingMachineEachMonth["Earle Asphalt"],
          backgroundColor: "#033495",
          borderColor: "#033495",
          borderWidth: 1,
        },
        {
          label: "GuttenPlans",
          data: transactionOnVendingMachineEachMonth["GuttenPlans"],
          backgroundColor: "#AEE4FF",
          borderColor: "#AEE4FF",
          borderWidth: 1,
        },
      ],
    };

    const datasellingcategory = {
      labels: uniquePlace,
      datasets: [
        {
          label: category[0],
          data: test[category[0]],
          backgroundColor: "#6A9CFD",
          borderColor: "#6A9CFD",
          borderWidth: 1,
        },
        {
          label: category[1],
          data: test[category[1]],
          backgroundColor: "#FFB8D0",
          borderColor: "#FFB8D0",
          borderWidth: 1,
        },
        {
          label: category[2],
          data: test[category[2]],
          backgroundColor: "#033495",
          borderColor: "#033495",
          borderWidth: 1,
        },
        {
          label: category[3],
          data: test[category[3]],
          backgroundColor: "#AEE4FF",
          borderColor: "#AEE4FF",
          borderWidth: 1,
        },
      ],
    };

    const configaveragevalue = returnOptions(
      "line",
      dataaveragevalue,
      "Average Value of Transaction",
      "Location",
      "Avg Transaction",
      false,
      false,
      "x"
    );
    const configpaymenttype = returnOptions(
      "bar",
      datapaymenttype,
      "Payment Type in each Machine",
      "Location",
      "Total Transaction",
      false,
      false,
      "x"
    );
    const configsalescategory = returnOptions(
      "bar",
      datasalescategory,
      "Sales in each Category",
      "Category",
      "Total Sales",
      false,
      false,
      "x"
    );
    const configpeaksales = returnOptions(
      "bar",
      datapeaksales,
      "Peak Sales Date",
      "Transaction Date",
      "Transaction Count",
      false,
      false,
      "x"
    );
    const configsellingcategory = returnOptions(
      "bar",
      datasellingcategory,
      "Top Selling Category Across Machine",
      "Category",
      "Location",
      true,
      true,
      "y"
    );

    myaveragevalue = new Chart(document.getElementById("averagevalue"), configaveragevalue);

    mypaymenttype = new Chart(document.getElementById("paymenttype"), configpaymenttype);

    mysalescategory = new Chart(document.getElementById("salescategory"), configsalescategory);

    mypeaksales = new Chart(document.getElementById("peaksales"), configpeaksales);

    mysellingcategory = new Chart(document.getElementById("sellingcategory"), configsellingcategory);

    const chartVersion = document.getElementById("chartVersion");
    chartVersion.innerText = Chart.version;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });


document.addEventListener("DOMContentLoaded", function() {
  const menuLinks = document.querySelectorAll(".menu-link");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function(event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});

//coba1
document.addEventListener("DOMContentLoaded", function() {
  var dropdownBtns = document.getElementsByClassName("dropdown-btn");
  var dropdownContents = document.getElementsByClassName("dropdown-content");

  for (let i = 0; i < dropdownBtns.length; i++) {
    dropdownBtns[i].addEventListener("click", function() {
      var content = dropdownContents[i];
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  document.addEventListener("click", function(event) {
    for (let i = 0; i < dropdownBtns.length; i++) {
      if (
        !dropdownBtns[i].contains(event.target) &&
        !dropdownContents[i].contains(event.target)
      ) {
        dropdownContents[i].style.display = "none";
      }
    }
  });
});
//
function hideAllCharts() {
  document.querySelectorAll(".chart-container").forEach((chart) => {
    chart.style.display = "none";
  });
}

function showChart(chartId) {
  document.getElementById(chartId).style.display = "block";
}

document.getElementById("feedbackBtn").addEventListener("click", function() {
  var feedbackForm = document.getElementById("feedbackForm");
  feedbackForm.style.display = "block";
});

//sini

document.getElementById('feedbackBtn').addEventListener('click', function () {
  var feedbackForm = document.getElementById('feedbackForm');
  feedbackForm.style.display = 'block';
  document.getElementById('feedbackText').value = ''; // Reset the form when the feedback button is clicked
});

(function() {
  emailjs.init("0bfMej1wdYwAoWHx8");
})();

document.getElementById('sendFeedbackBtn').addEventListener('click', function () {
  var feedbackText = document.getElementById('feedbackText').value;
  var notification = document.getElementById('notification');

  notification.style.display = 'block'; // Ensure the notification is displayed

  if (feedbackText.trim() === '') {
    notification.innerText = 'Please write some feedback before sending.';
    notification.style.color = 'red';
  } else if (feedbackText.length > 100) {
    notification.innerText = 'Feedback is too long. Please limit to 100 characters.';
    notification.style.color = 'red';
  } else {
    notification.innerText = 'Thank you for your feedback!';
    notification.style.color = 'green';

    // Send the feedback via email
    sendMail(feedbackText);
  }
});

function sendMail(feedbackText) {
  let params = {
    feedbackText: feedbackText
  };
  console.log("Params to be sent:", params);

  let serviceID = "service_dqwvzfe"; // Email Service ID
  let templateID = "template_ry43oor"; // Email Template ID

  emailjs.send(serviceID, templateID, params)
    .then(res => {
      alert("Email sent successfully!");
      document.getElementById("feedbackForm").style.display = 'none';
      document.getElementById("feedbackText").value = '';
    })
    .catch(err => {
      console.error("Failed to send email:", err);
      alert("Failed to send email. Please try again later.");
    });
}



document.addEventListener("click", function(event) {
  var feedbackForm = document.getElementById("feedbackForm");
  var feedbackBtn = document.getElementById("feedbackBtn");
  if (
    !feedbackForm.contains(event.target) &&
    !feedbackBtn.contains(event.target)
  ) {
    feedbackForm.style.display = "none";
  }
});

