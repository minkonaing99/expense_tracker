// Expense Tracker App.js
$(function () {
  const toast = new bootstrap.Toast($("#successToast")[0]);
  let isExpenseActive = true;

  const $wallet = $("#wallet");
  const $daily = $("#daily");
  const $monthly = $("#monthly");
  const $totalExpenses = $("#total_expenses");
  const $groupedTransactions = $("#groupedTransactions");
  const $category = $("#category");
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

  categories.forEach((cat) =>
    $category.append(`<option value="${cat}">${cat}</option>`)
  );

  $("#toggleFormBtn").on("click", function () {
    isExpenseActive = !isExpenseActive;
    $("#expenseForm").toggleClass("d-none", !isExpenseActive);
    $("#walletForm").toggleClass("d-none", isExpenseActive);
    $("#formTitle").text(isExpenseActive ? "Add Expenses" : "Add Wallet");
    $(this)
      .text(isExpenseActive ? "Add Wallet" : "Add Expenses")
      .toggleClass("opacity-50", isExpenseActive);
  });

  $("#addExpensesBtn").on("click", function () {
    const date =
      $("#expenseDate").val() || new Date().toISOString().split("T")[0];
    const category = $category.val();
    const details = $("#details").val();
    const amount = $("#expenseAmount").val();

    if (!category || !details || !amount)
      return alert("Please fill in all fields.");

    $.post(
      "add_transaction.php",
      { date, category, details, amount },
      function () {
        $("#expenseForm").find("input, textarea, select").val("");
        toast.show();
        setTimeout(() => location.reload(), 1500);
      }
    ).fail(() => alert("Something went wrong."));
  });

  $("#addWalletBtn").on("click", function () {
    const date =
      $("#walletDate").val() || new Date().toISOString().split("T")[0];
    const wallet = $("#walletInput").val();
    const amount = $("#incomeAmount").val();

    if (!wallet || !amount) return alert("Please fill in all fields.");

    $.post("add_wallet.php", { date, wallet, amount }, function () {
      $("#walletForm").find("input").val("");
      toast.show();
      setTimeout(() => location.reload(), 1500);
    }).fail(() => alert("Something went wrong."));
  });

  const parseDate = (str) =>
    new Date(...str.split("-").map((v, i) => (i === 1 ? +v - 1 : +v)));

  let income = 0,
    total_expense = 0,
    daily_expense = 0,
    monthly_expense = 0;
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const thisMonth = today.getMonth(),
    thisYear = today.getFullYear();

  $.getJSON("income.php", (data) => {
    data.forEach((i) => (income += parseFloat(i.amount)));
  });

  $.getJSON("expense_table.php", (data) => {
    const groupedData = {},
      dateTotals = {};
    let index = 1;

    data.forEach((item) => {
      const date = parseDate(item.date);
      const dateStr = item.date;
      const amount = parseFloat(item.amount);
      total_expense += amount;
      if (!groupedData[dateStr]) {
        groupedData[dateStr] = [];
        dateTotals[dateStr] = 0;
      }
      groupedData[dateStr].push(item);
      dateTotals[dateStr] += amount;
      if (dateStr === todayStr) daily_expense += amount;
      if (date.getMonth() === thisMonth && date.getFullYear() === thisYear)
        monthly_expense += amount;
    });

    $totalExpenses.text(`THB ${total_expense}`);
    $daily.text(`THB ${daily_expense}`);
    $monthly.text(`THB ${monthly_expense}`);

    let html = "";
    for (const date in groupedData) {
      html += `<div class="fw-bold mt-3">
        <div class="bg-secondary linebreak mb-3"></div>
        <div class="mt-1">Date: ${date} // Total: THB ${dateTotals[date]}</div>
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
    $wallet.text(`THB ${income - total_expense}`);
  });

  $("#download").on("click", () => {
    $.getJSON("expense_table.php", function (data) {
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
      a.download = "expenses.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });

  $.getJSON("expense_data.php", (data) => {
    const ctx = document.getElementById("myPieChart").getContext("2d");
    new Chart(ctx, {
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
  });

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

  $('a[href="index.html"]').on("click", function () {
    $("#chart").addClass("d-none");
  });
});
