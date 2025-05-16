// Expense Tracker App.js - Complete Version with Error Handling
$(function () {
  // Initialize toast notifications
  const successToast = new bootstrap.Toast($("#successToast")[0]);
  const errorToast = new bootstrap.Toast($("#errorToast")[0]);
  let isExpenseActive = true;

  // DOM Elements
  const $wallet = $("#wallet");
  const $daily = $("#daily");
  const $monthly = $("#monthly");
  const $totalExpenses = $("#total_expenses");
  const $groupedTransactions = $("#groupedTransactions");
  const $category = $("#category");
  
  // Categories
  const categories = [
    "Meals",
    "Groceries",
    "Restaurant",
    "Snacks",
    "Transport",
    "Education",
    "Bills",
    "Rent",
    "Lazada Payment",
    "Shopee Payment",
    "Tiktok Payment",
    "Savings",
  ];

  // Initialize category dropdown
  categories.forEach((cat) =>
    $category.append(`<option value="${cat}">${cat}</option>`)
  );

  // Toggle between expense and wallet forms
  $("#toggleFormBtn").on("click", function () {
    isExpenseActive = !isExpenseActive;
    $("#expenseForm").toggleClass("d-none", !isExpenseActive);
    $("#walletForm").toggleClass("d-none", isExpenseActive);
    $("#formTitle").text(isExpenseActive ? "Add Expenses" : "Add Wallet");
    $(this)
      .text(isExpenseActive ? "Add Wallet" : "Add Expenses")
      .toggleClass("opacity-50", isExpenseActive);
  });

  // Add expense handler
  $("#addExpensesBtn").on("click", function () {
    const date =
      $("#expenseDate").val() || new Date().toISOString().split("T")[0];
    const category = $category.val();
    const details = $("#details").val();
    const amount = $("#expenseAmount").val();

    if (!category || !details || !amount) {
      showError("Please fill in all fields.");
      return;
    }

    $.post(
      "add_transaction.php",
      { date, category, details, amount },
      function () {
        $("#expenseForm").find("input, textarea, select").val("");
        successToast.show();
        setTimeout(() => loadData(), 1500);
      }
    ).fail(() => showError("Failed to add expense. Please try again."));
  });

  // Add wallet handler
  $("#addWalletBtn").on("click", function () {
    const date =
      $("#walletDate").val() || new Date().toISOString().split("T")[0];
    const wallet = $("#walletInput").val();
    const amount = $("#incomeAmount").val();

    if (!wallet || !amount) {
      showError("Please fill in all fields.");
      return;
    }

    $.post("add_wallet.php", { date, wallet, amount }, function () {
      $("#walletForm").find("input").val("");
      successToast.show();
      setTimeout(() => loadData(), 1500);
    }).fail(() => showError("Failed to add wallet. Please try again."));
  });

  // Helper function to parse date strings
  const parseDate = (str) =>
    new Date(...str.split("-").map((v, i) => (i === 1 ? +v - 1 : +v)));

  // Main data loading function
  function loadData() {
    showLoading(true);
    
    Promise.all([
      $.getJSON("income.php?_=" + new Date().getTime()).catch(() => []),
      $.getJSON("expense_table.php?_=" + new Date().getTime()).catch(() => [])
    ]).then(function([incomeData, expenseData]) {
      // Process income data
      const income = incomeData.reduce((sum, i) => sum + parseFloat(i.amount || 0), 0);
      
      // Process expense data
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];
      const thisMonth = today.getMonth();
      const thisYear = today.getFullYear();
      
      const groupedData = {};
      const dateTotals = {};
      let total_expense = 0;
      let daily_expense = 0;
      let monthly_expense = 0;
      let index = 1;

      expenseData.forEach((item) => {
        const date = parseDate(item.date);
        const dateStr = item.date;
        const amount = parseFloat(item.amount || 0);
        
        total_expense += amount;
        
        if (!groupedData[dateStr]) {
          groupedData[dateStr] = [];
          dateTotals[dateStr] = 0;
        }
        
        groupedData[dateStr].push(item);
        dateTotals[dateStr] += amount;
        
        if (dateStr === todayStr) daily_expense += amount;
        if (date.getMonth() === thisMonth && date.getFullYear() === thisYear) {
          monthly_expense += amount;
        }
      });

      // Update UI elements
      $wallet.text(`THB ${(income - total_expense)}`);
      $totalExpenses.text(`THB ${total_expense}`);
      $daily.text(`THB ${daily_expense}`);
      $monthly.text(`THB ${monthly_expense}`);

      // Build transactions HTML
      let html = "";
      for (const date in groupedData) {
        html += `<div class="fw-bold mt-3">
          <div class="bg-secondary linebreak mb-3"></div>
          <div class="mt-1">Date: ${date}       //       Total: THB ${dateTotals[date]}</div>
        </div>
        <div class="row">
          <div class="col-1 fw-bold">#</div>
          <div class="col-3 fw-bold">Category</div>
          <div class="col-5 col-md-4 fw-bold">Details</div>
          <div class="col fw-bold text-end">Amount</div>
        </div>`;

        groupedData[date].forEach((item) => {
          html += `<div class="row">
            <div class="col-1">${index++}</div>
            <div class="col-3">${item.category}</div>
            <div class="col-5 col-md-4">${$("<div>")
              .text(item.details)
              .html()}</div>
            <div class="col text-end">${parseFloat(item.amount)}</div>
          </div>`;
        });
      }
      
      $groupedTransactions.html(html);
      loadChartData();
    }).catch(error => {
      console.error("Error loading data:", error);
      showError("Failed to load data. Please refresh the page.");
    }).finally(() => {
      showLoading(false);
    });
  }

  // Load chart data
  function loadChartData() {
    $.getJSON("expense_data.php?_=" + new Date().getTime(), (data) => {
      const ctx = document.getElementById("myPieChart").getContext("2d");
      
      // Destroy previous chart if exists
      if (window.expenseChart) {
        window.expenseChart.destroy();
      }
      
      window.expenseChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Expenses by Category",
              data: data.values,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#8BC34A",
                "#FFA07A",
                "#9370DB",
                "#00BFFF",
                "#FF69B4",
                "#FFD700",
                "#DC143C",
                "#40E0D0",
                "#6495ED",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
          },
        },
      });
    }).fail(() => console.error("Failed to load chart data"));
  }

  // Export to CSV
  $("#download").on("click", () => {
    $.getJSON("expense_table.php?_=" + new Date().getTime(), function (data) {
      if (!data || data.length === 0) {
        showError("No data available to export");
        return;
      }
      
      const csv = [Object.keys(data[0]).join(",")]
        .concat(
          data.map((row) =>
            Object.values(row)
              .map((v) => `"${v}"`)
              .join(",")
          )
        )
        .join("\n");
      
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }).fail(() => showError("Failed to generate export"));
  });

  // Toggle chart visibility
  $("#chartButton").on("click", function (e) {
    e.preventDefault();
    const chart = $("#chart");
    if (chart.hasClass("d-none")) {
      chart.removeClass("d-none");
      setTimeout(() => {
        document.getElementById("chart").scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      chart.addClass("d-none");
    }
  });

  // Reset chart when navigating home
  $('a[href="index.html"]').on("click", function () {
    $("#chart").addClass("d-none");
  });

  // Helper functions
  function showError(message) {
    $("#errorToast .toast-body").text(message);
    errorToast.show();
  }

  function showLoading(show) {
    if (show) {
      $("#loadingIndicator").removeClass("d-none");
    } else {
      $("#loadingIndicator").addClass("d-none");
    }
  }

  // Initial data load
  loadData();
});