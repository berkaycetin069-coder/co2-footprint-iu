document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // DATEN (unverändert)
  // =======================
  const data = [
    { company: "BMW Group", country: "Deutschland", co2: 170000 },
    { company: "Bayer AG", country: "Deutschland", co2: 130000 },
    { company: "Siemens", country: "Deutschland", co2: 90000 },
    { company: "Airbus", country: "Frankreich", co2: 210000 },
    { company: "Renault Group", country: "Frankreich", co2: 75000 },
    { company: "Ferrari", country: "Italien", co2: 95000 },
    { company: "Enel", country: "Italien", co2: 140000 },
    { company: "Telefónica", country: "Spanien", co2: 160000 },
    { company: "Iberdrola", country: "Spanien", co2: 82000 },
    { company: "Toyota", country: "Japan", co2: 260000 },
    { company: "Sony", country: "Japan", co2: 110000 },
    { company: "Apple", country: "USA", co2: 220000 },
    { company: "Microsoft", country: "USA", co2: 190000 },
    { company: "Tesla", country: "USA", co2: 155000 }
  ];

  const tableBody = document.querySelector("table tbody");
  const searchInput = document.getElementById("searchInput");
  const rtlToggle = document.getElementById("rtlToggle");

  // =======================
  // RENDER (unverändert)
  // =======================
  function render(rows) {
    tableBody.textContent = "";

    rows.forEach(row => {
      const tr = document.createElement("tr");

      const tdCompany = document.createElement("td");
      tdCompany.textContent = row.company;

      const tdCountry = document.createElement("td");
      tdCountry.textContent = row.country;

      const tdCo2 = document.createElement("td");
      tdCo2.textContent = row.co2.toString();

      tr.appendChild(tdCompany);
      tr.appendChild(tdCountry);
      tr.appendChild(tdCo2);

      tableBody.appendChild(tr);
    });
  }

  // =======================
  // FILTER (unverändert)
  // =======================
  function getFilteredRows() {
    const value = searchInput.value.toLowerCase().trim();

    return data.filter(item =>
      item.company.toLowerCase().includes(value) ||
      item.country.toLowerCase().includes(value)
    );
  }

  // =======================
  // SORTIERFUNKTION (NEU)
  // =======================
  let sortState = { key: null, dir: 1 };

  function sortRows(rows) {
    if (!sortState.key) return rows;

    const key = sortState.key;
    const dir = sortState.dir;

    return [...rows].sort((a, b) => {
      const av = a[key];
      const bv = b[key];

      if (typeof av === "number") {
        return (av - bv) * dir;
      }

      return av.localeCompare(bv, "de") * dir;
    });
  }

  function setSort(key) {
    if (sortState.key === key) {
      sortState.dir *= -1;
    } else {
      sortState.key = key;
      sortState.dir = 1;
    }
    updateView();
  }

  // =======================
  // VIEW UPDATE (unverändert)
  // =======================
  function updateView() {
    const filtered = getFilteredRows();
    const sorted = sortRows(filtered);
    render(sorted);
  }

  // =======================
  // EVENTS (nur ergänzt)
  // =======================
  searchInput.addEventListener("input", updateView);

  document.querySelectorAll("th[data-sort]").forEach(th => {
    th.style.cursor = "pointer";
    th.addEventListener("click", () => {
      const key = th.getAttribute("data-sort");
      setSort(key);
    });
  });

  rtlToggle.addEventListener("change", () => {
    document.body.classList.toggle("rtl", rtlToggle.checked);
  });


  updateView();
});
