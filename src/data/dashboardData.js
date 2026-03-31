export const customers = [
  "Acme Corp",
  "Northstar Health",
  "Pioneer Retail",
  "Summit Financial",
  "BlueWave Tech",
  "Evergreen Foods",
];

export const views = [
  { id: 1, title: "Products A + B" },
  { id: 2, title: "Products C + D" },
  { id: 3, title: "Products E + F" },
  { id: 4, title: "Product G" },
];

export const customerData = {
  "Acme Corp": {
    1: {
      panels: [
        {
          title: "Product A",
          status: "green",
          metrics: [
            { title: "Seat Growth (Month)", value: "+142" },
            { title: "Seat Growth (TTM)", value: "+1,284" },
          ],
          chartType: "barTrend",
          chartProps: {
            color: "#3b82f6",
            data: [
              { label: "Jul", value: 85 },
              { label: "Aug", value: 102 },
              { label: "Sep", value: 118 },
              { label: "Oct", value: 95 },
              { label: "Nov", value: 130 },
              { label: "Dec", value: 142 },
            ],
          },
          tableHeaders: ["Month", "New Seats"],
          tableRows: [
            ["Jul", "+85"],
            ["Aug", "+102"],
            ["Sep", "+118"],
            ["Oct", "+95"],
            ["Nov", "+130"],
            ["Dec", "+142"],
          ],
        },
        {
          title: "Product B",
          status: "yellow",
          metrics: [
            { title: "Revenue Growth (Month)", value: "+$28K" },
            { title: "Revenue Growth (TTM)", value: "+$312K" },
          ],
          chartType: "lineTrend",
          chartProps: {
            color: "#22c55e",
            data: [
              { label: "Jul", value: 18 },
              { label: "Aug", value: 22 },
              { label: "Sep", value: 25 },
              { label: "Oct", value: 20 },
              { label: "Nov", value: 26 },
              { label: "Dec", value: 28 },
            ],
          },
          tableHeaders: ["Month", "Revenue"],
          tableRows: [
            ["Jul", "$18K"],
            ["Aug", "$22K"],
            ["Sep", "$25K"],
            ["Oct", "$20K"],
            ["Nov", "$26K"],
            ["Dec", "$28K"],
          ],
        },
      ],
    },
    2: {
      panels: [
        {
          title: "Product C",
          status: "green",
          metrics: [
            { title: "Usage (Month)", value: "94K units" },
            { title: "Usage (TTM)", value: "1.08M units" },
          ],
          chartType: "areaTrend",
          chartProps: {
            color: "#a855f7",
            data: [
              { label: "Jul", value: 72 },
              { label: "Aug", value: 80 },
              { label: "Sep", value: 85 },
              { label: "Oct", value: 88 },
              { label: "Nov", value: 91 },
              { label: "Dec", value: 94 },
            ],
          },
          tableHeaders: ["Month", "Usage (K)"],
          tableRows: [
            ["Jul", "72K"],
            ["Aug", "80K"],
            ["Sep", "85K"],
            ["Oct", "88K"],
            ["Nov", "91K"],
            ["Dec", "94K"],
          ],
        },
        {
          title: "Product D",
          status: "yellow",
          metrics: [
            { title: "Old Product Mix", value: "38%" },
            { title: "New Product Mix", value: "62%" },
          ],
          chartType: "splitBars",
          chartProps: {
            colorA: "#94a3b8",
            colorB: "#38bdf8",
            data: [
              { label: "Q1", valueA: 60, valueB: 40 },
              { label: "Q2", valueA: 52, valueB: 48 },
              { label: "Q3", valueA: 45, valueB: 55 },
              { label: "Q4", valueA: 38, valueB: 62 },
            ],
          },
          tableHeaders: ["Quarter", "Old %", "New %"],
          tableRows: [
            ["Q1", "60%", "40%"],
            ["Q2", "52%", "48%"],
            ["Q3", "45%", "55%"],
            ["Q4", "38%", "62%"],
          ],
        },
      ],
    },
    3: {
      panels: [
        {
          title: "Product E",
          status: "green",
          metrics: [
            { title: "Type 1 TTM", value: "420K" },
            { title: "Type 2 TTM", value: "380K" },
          ],
          chartType: "groupedBars",
          chartProps: {
            colorA: "#f97316",
            colorB: "#ec4899",
            labelA: "Type 1",
            labelB: "Type 2",
            data: [
              { label: "Q1", valueA: 88, valueB: 72 },
              { label: "Q2", valueA: 102, valueB: 88 },
              { label: "Q3", valueA: 115, valueB: 98 },
              { label: "Q4", valueA: 115, valueB: 122 },
            ],
          },
          tableHeaders: ["Quarter", "Type 1", "Type 2"],
          tableRows: [
            ["Q1", "88K", "72K"],
            ["Q2", "102K", "88K"],
            ["Q3", "115K", "98K"],
            ["Q4", "115K", "122K"],
          ],
        },
        {
          title: "Product F",
          status: "green",
          metrics: [
            { title: "TTM Revenue", value: "$2.1M" },
            { title: "YoY Growth", value: "+18%" },
          ],
          chartType: "stackedMonthly",
          chartProps: {
            colors: ["#1d4ed8", "#3b82f6", "#93c5fd"],
            labels: ["F1", "F2", "F3"],
            data: [
              { label: "Jul", values: [45, 30, 20] },
              { label: "Aug", values: [48, 32, 22] },
              { label: "Sep", values: [52, 35, 24] },
              { label: "Oct", values: [50, 36, 25] },
              { label: "Nov", values: [55, 38, 26] },
              { label: "Dec", values: [58, 40, 28] },
            ],
          },
          tableHeaders: ["Month", "F1", "F2", "F3"],
          tableRows: [
            ["Jul", "45", "30", "20"],
            ["Aug", "48", "32", "22"],
            ["Sep", "52", "35", "24"],
            ["Oct", "50", "36", "25"],
            ["Nov", "55", "38", "26"],
            ["Dec", "58", "40", "28"],
          ],
        },
      ],
    },
    4: {
      panels: [
        {
          title: "Product G / Bookings",
          status: "green",
          metrics: [
            { title: "X Net New Bookings (QTD)", value: "$1.4M" },
            { title: "Y Net New Bookings (QTD)", value: "$980K" },
          ],
          chartType: "quarterProgress",
          chartProps: {
            colorA: "#22c55e",
            colorB: "#3b82f6",
            labelA: "Product X",
            labelB: "Product Y",
            data: [
              { label: "Product X", value: 70, target: 100, color: "#22c55e" },
              { label: "Product Y", value: 49, target: 100, color: "#3b82f6" },
            ],
          },
          tableHeaders: ["Product", "QTD", "Target", "Attain %"],
          tableRows: [
            ["Product X", "$1.4M", "$2.0M", "70%"],
            ["Product Y", "$980K", "$2.0M", "49%"],
          ],
        },
      ],
    },
  },

  "Northstar Health": {
    1: {
      panels: [
        {
          title: "Product A",
          status: "yellow",
          metrics: [
            { title: "Seat Growth (Month)", value: "+68" },
            { title: "Seat Growth (TTM)", value: "+742" },
          ],
          chartType: "barTrend",
          chartProps: {
            color: "#3b82f6",
            data: [
              { label: "Jul", value: 55 },
              { label: "Aug", value: 62 },
              { label: "Sep", value: 58 },
              { label: "Oct", value: 72 },
              { label: "Nov", value: 65 },
              { label: "Dec", value: 68 },
            ],
          },
          tableHeaders: ["Month", "New Seats"],
          tableRows: [
            ["Jul", "+55"],
            ["Aug", "+62"],
            ["Sep", "+58"],
            ["Oct", "+72"],
            ["Nov", "+65"],
            ["Dec", "+68"],
          ],
        },
        {
          title: "Product B",
          status: "yellow",
          metrics: [
            { title: "Revenue Growth (Month)", value: "+$15K" },
            { title: "Revenue Growth (TTM)", value: "+$168K" },
          ],
          chartType: "lineTrend",
          chartProps: {
            color: "#22c55e",
            data: [
              { label: "Jul", value: 10 },
              { label: "Aug", value: 14 },
              { label: "Sep", value: 12 },
              { label: "Oct", value: 16 },
              { label: "Nov", value: 13 },
              { label: "Dec", value: 15 },
            ],
          },
          tableHeaders: ["Month", "Revenue"],
          tableRows: [
            ["Jul", "$10K"],
            ["Aug", "$14K"],
            ["Sep", "$12K"],
            ["Oct", "$16K"],
            ["Nov", "$13K"],
            ["Dec", "$15K"],
          ],
        },
      ],
    },
    2: {
      panels: [
        {
          title: "Product C",
          status: "green",
          metrics: [
            { title: "Usage (Month)", value: "128K units" },
            { title: "Usage (TTM)", value: "1.42M units" },
          ],
          chartType: "areaTrend",
          chartProps: {
            color: "#a855f7",
            data: [
              { label: "Jul", value: 95 },
              { label: "Aug", value: 105 },
              { label: "Sep", value: 112 },
              { label: "Oct", value: 118 },
              { label: "Nov", value: 124 },
              { label: "Dec", value: 128 },
            ],
          },
          tableHeaders: ["Month", "Usage (K)"],
          tableRows: [
            ["Jul", "95K"],
            ["Aug", "105K"],
            ["Sep", "112K"],
            ["Oct", "118K"],
            ["Nov", "124K"],
            ["Dec", "128K"],
          ],
        },
        {
          title: "Product D",
          status: "red",
          metrics: [
            { title: "Old Product Mix", value: "72%" },
            { title: "New Product Mix", value: "28%" },
          ],
          chartType: "splitBars",
          chartProps: {
            colorA: "#94a3b8",
            colorB: "#38bdf8",
            data: [
              { label: "Q1", valueA: 88, valueB: 12 },
              { label: "Q2", valueA: 84, valueB: 16 },
              { label: "Q3", valueA: 78, valueB: 22 },
              { label: "Q4", valueA: 72, valueB: 28 },
            ],
          },
          tableHeaders: ["Quarter", "Old %", "New %"],
          tableRows: [
            ["Q1", "88%", "12%"],
            ["Q2", "84%", "16%"],
            ["Q3", "78%", "22%"],
            ["Q4", "72%", "28%"],
          ],
        },
      ],
    },
    3: {
      panels: [
        {
          title: "Product E",
          status: "yellow",
          metrics: [
            { title: "Type 1 TTM", value: "280K" },
            { title: "Type 2 TTM", value: "310K" },
          ],
          chartType: "groupedBars",
          chartProps: {
            colorA: "#f97316",
            colorB: "#ec4899",
            labelA: "Type 1",
            labelB: "Type 2",
            data: [
              { label: "Q1", valueA: 60, valueB: 65 },
              { label: "Q2", valueA: 68, valueB: 75 },
              { label: "Q3", valueA: 75, valueB: 82 },
              { label: "Q4", valueA: 77, valueB: 88 },
            ],
          },
          tableHeaders: ["Quarter", "Type 1", "Type 2"],
          tableRows: [
            ["Q1", "60K", "65K"],
            ["Q2", "68K", "75K"],
            ["Q3", "75K", "82K"],
            ["Q4", "77K", "88K"],
          ],
        },
        {
          title: "Product F",
          status: "green",
          metrics: [
            { title: "TTM Revenue", value: "$1.6M" },
            { title: "YoY Growth", value: "+12%" },
          ],
          chartType: "stackedMonthly",
          chartProps: {
            colors: ["#1d4ed8", "#3b82f6", "#93c5fd"],
            labels: ["F1", "F2", "F3"],
            data: [
              { label: "Jul", values: [35, 25, 15] },
              { label: "Aug", values: [38, 26, 16] },
              { label: "Sep", values: [40, 28, 18] },
              { label: "Oct", values: [42, 29, 18] },
              { label: "Nov", values: [44, 30, 19] },
              { label: "Dec", values: [46, 32, 20] },
            ],
          },
          tableHeaders: ["Month", "F1", "F2", "F3"],
          tableRows: [
            ["Jul", "35", "25", "15"],
            ["Aug", "38", "26", "16"],
            ["Sep", "40", "28", "18"],
            ["Oct", "42", "29", "18"],
            ["Nov", "44", "30", "19"],
            ["Dec", "46", "32", "20"],
          ],
        },
      ],
    },
    4: {
      panels: [
        {
          title: "Product G / Bookings",
          status: "yellow",
          metrics: [
            { title: "X Net New Bookings (QTD)", value: "$820K" },
            { title: "Y Net New Bookings (QTD)", value: "$640K" },
          ],
          chartType: "quarterProgress",
          chartProps: {
            colorA: "#22c55e",
            colorB: "#3b82f6",
            labelA: "Product X",
            labelB: "Product Y",
            data: [
              { label: "Product X", value: 41, target: 100, color: "#22c55e" },
              { label: "Product Y", value: 32, target: 100, color: "#3b82f6" },
            ],
          },
          tableHeaders: ["Product", "QTD", "Target", "Attain %"],
          tableRows: [
            ["Product X", "$820K", "$2.0M", "41%"],
            ["Product Y", "$640K", "$2.0M", "32%"],
          ],
        },
      ],
    },
  },

  "Pioneer Retail": {
    1: {
      panels: [
        {
          title: "Product A",
          status: "red",
          metrics: [
            { title: "Seat Growth (Month)", value: "+22" },
            { title: "Seat Growth (TTM)", value: "+285" },
          ],
          chartType: "barTrend",
          chartProps: {
            color: "#3b82f6",
            data: [
              { label: "Jul", value: 38 },
              { label: "Aug", value: 32 },
              { label: "Sep", value: 28 },
              { label: "Oct", value: 30 },
              { label: "Nov", value: 25 },
              { label: "Dec", value: 22 },
            ],
          },
          tableHeaders: ["Month", "New Seats"],
          tableRows: [
            ["Jul", "+38"],
            ["Aug", "+32"],
            ["Sep", "+28"],
            ["Oct", "+30"],
            ["Nov", "+25"],
            ["Dec", "+22"],
          ],
        },
        {
          title: "Product B",
          status: "yellow",
          metrics: [
            { title: "Revenue Growth (Month)", value: "+$9K" },
            { title: "Revenue Growth (TTM)", value: "+$98K" },
          ],
          chartType: "lineTrend",
          chartProps: {
            color: "#22c55e",
            data: [
              { label: "Jul", value: 12 },
              { label: "Aug", value: 10 },
              { label: "Sep", value: 11 },
              { label: "Oct", value: 9 },
              { label: "Nov", value: 10 },
              { label: "Dec", value: 9 },
            ],
          },
          tableHeaders: ["Month", "Revenue"],
          tableRows: [
            ["Jul", "$12K"],
            ["Aug", "$10K"],
            ["Sep", "$11K"],
            ["Oct", "$9K"],
            ["Nov", "$10K"],
            ["Dec", "$9K"],
          ],
        },
      ],
    },
    2: {
      panels: [
        {
          title: "Product C",
          status: "yellow",
          metrics: [
            { title: "Usage (Month)", value: "58K units" },
            { title: "Usage (TTM)", value: "652K units" },
          ],
          chartType: "areaTrend",
          chartProps: {
            color: "#a855f7",
            data: [
              { label: "Jul", value: 62 },
              { label: "Aug", value: 58 },
              { label: "Sep", value: 55 },
              { label: "Oct", value: 60 },
              { label: "Nov", value: 57 },
              { label: "Dec", value: 58 },
            ],
          },
          tableHeaders: ["Month", "Usage (K)"],
          tableRows: [
            ["Jul", "62K"],
            ["Aug", "58K"],
            ["Sep", "55K"],
            ["Oct", "60K"],
            ["Nov", "57K"],
            ["Dec", "58K"],
          ],
        },
        {
          title: "Product D",
          status: "green",
          metrics: [
            { title: "Old Product Mix", value: "25%" },
            { title: "New Product Mix", value: "75%" },
          ],
          chartType: "splitBars",
          chartProps: {
            colorA: "#94a3b8",
            colorB: "#38bdf8",
            data: [
              { label: "Q1", valueA: 55, valueB: 45 },
              { label: "Q2", valueA: 42, valueB: 58 },
              { label: "Q3", valueA: 32, valueB: 68 },
              { label: "Q4", valueA: 25, valueB: 75 },
            ],
          },
          tableHeaders: ["Quarter", "Old %", "New %"],
          tableRows: [
            ["Q1", "55%", "45%"],
            ["Q2", "42%", "58%"],
            ["Q3", "32%", "68%"],
            ["Q4", "25%", "75%"],
          ],
        },
      ],
    },
    3: {
      panels: [
        {
          title: "Product E",
          status: "red",
          metrics: [
            { title: "Type 1 TTM", value: "155K" },
            { title: "Type 2 TTM", value: "188K" },
          ],
          chartType: "groupedBars",
          chartProps: {
            colorA: "#f97316",
            colorB: "#ec4899",
            labelA: "Type 1",
            labelB: "Type 2",
            data: [
              { label: "Q1", valueA: 42, valueB: 50 },
              { label: "Q2", valueA: 38, valueB: 46 },
              { label: "Q3", valueA: 36, valueB: 45 },
              { label: "Q4", valueA: 39, valueB: 47 },
            ],
          },
          tableHeaders: ["Quarter", "Type 1", "Type 2"],
          tableRows: [
            ["Q1", "42K", "50K"],
            ["Q2", "38K", "46K"],
            ["Q3", "36K", "45K"],
            ["Q4", "39K", "47K"],
          ],
        },
        {
          title: "Product F",
          status: "yellow",
          metrics: [
            { title: "TTM Revenue", value: "$880K" },
            { title: "YoY Growth", value: "+4%" },
          ],
          chartType: "stackedMonthly",
          chartProps: {
            colors: ["#1d4ed8", "#3b82f6", "#93c5fd"],
            labels: ["F1", "F2", "F3"],
            data: [
              { label: "Jul", values: [22, 18, 12] },
              { label: "Aug", values: [24, 18, 12] },
              { label: "Sep", values: [23, 17, 11] },
              { label: "Oct", values: [25, 18, 12] },
              { label: "Nov", values: [24, 17, 11] },
              { label: "Dec", values: [26, 18, 12] },
            ],
          },
          tableHeaders: ["Month", "F1", "F2", "F3"],
          tableRows: [
            ["Jul", "22", "18", "12"],
            ["Aug", "24", "18", "12"],
            ["Sep", "23", "17", "11"],
            ["Oct", "25", "18", "12"],
            ["Nov", "24", "17", "11"],
            ["Dec", "26", "18", "12"],
          ],
        },
      ],
    },
    4: {
      panels: [
        {
          title: "Product G / Bookings",
          status: "red",
          metrics: [
            { title: "X Net New Bookings (QTD)", value: "$420K" },
            { title: "Y Net New Bookings (QTD)", value: "$310K" },
          ],
          chartType: "quarterProgress",
          chartProps: {
            colorA: "#22c55e",
            colorB: "#3b82f6",
            labelA: "Product X",
            labelB: "Product Y",
            data: [
              { label: "Product X", value: 21, target: 100, color: "#22c55e" },
              { label: "Product Y", value: 16, target: 100, color: "#3b82f6" },
            ],
          },
          tableHeaders: ["Product", "QTD", "Target", "Attain %"],
          tableRows: [
            ["Product X", "$420K", "$2.0M", "21%"],
            ["Product Y", "$310K", "$2.0M", "16%"],
          ],
        },
      ],
    },
  },

  "Summit Financial": {
    1: {
      panels: [
        {
          title: "Product A",
          status: "green",
          metrics: [
            { title: "Seat Growth (Month)", value: "+188" },
            { title: "Seat Growth (TTM)", value: "+1,850" },
          ],
          chartType: "barTrend",
          chartProps: {
            color: "#3b82f6",
            data: [
              { label: "Jul", value: 145 },
              { label: "Aug", value: 162 },
              { label: "Sep", value: 170 },
              { label: "Oct", value: 175 },
              { label: "Nov", value: 180 },
              { label: "Dec", value: 188 },
            ],
          },
          tableHeaders: ["Month", "New Seats"],
          tableRows: [
            ["Jul", "+145"],
            ["Aug", "+162"],
            ["Sep", "+170"],
            ["Oct", "+175"],
            ["Nov", "+180"],
            ["Dec", "+188"],
          ],
        },
        {
          title: "Product B",
          status: "green",
          metrics: [
            { title: "Revenue Growth (Month)", value: "+$42K" },
            { title: "Revenue Growth (TTM)", value: "+$485K" },
          ],
          chartType: "lineTrend",
          chartProps: {
            color: "#22c55e",
            data: [
              { label: "Jul", value: 32 },
              { label: "Aug", value: 35 },
              { label: "Sep", value: 38 },
              { label: "Oct", value: 40 },
              { label: "Nov", value: 41 },
              { label: "Dec", value: 42 },
            ],
          },
          tableHeaders: ["Month", "Revenue"],
          tableRows: [
            ["Jul", "$32K"],
            ["Aug", "$35K"],
            ["Sep", "$38K"],
            ["Oct", "$40K"],
            ["Nov", "$41K"],
            ["Dec", "$42K"],
          ],
        },
      ],
    },
    2: {
      panels: [
        {
          title: "Product C",
          status: "green",
          metrics: [
            { title: "Usage (Month)", value: "108K units" },
            { title: "Usage (TTM)", value: "1.22M units" },
          ],
          chartType: "areaTrend",
          chartProps: {
            color: "#a855f7",
            data: [
              { label: "Jul", value: 85 },
              { label: "Aug", value: 90 },
              { label: "Sep", value: 98 },
              { label: "Oct", value: 100 },
              { label: "Nov", value: 105 },
              { label: "Dec", value: 108 },
            ],
          },
          tableHeaders: ["Month", "Usage (K)"],
          tableRows: [
            ["Jul", "85K"],
            ["Aug", "90K"],
            ["Sep", "98K"],
            ["Oct", "100K"],
            ["Nov", "105K"],
            ["Dec", "108K"],
          ],
        },
        {
          title: "Product D",
          status: "green",
          metrics: [
            { title: "Old Product Mix", value: "20%" },
            { title: "New Product Mix", value: "80%" },
          ],
          chartType: "splitBars",
          chartProps: {
            colorA: "#94a3b8",
            colorB: "#38bdf8",
            data: [
              { label: "Q1", valueA: 50, valueB: 50 },
              { label: "Q2", valueA: 38, valueB: 62 },
              { label: "Q3", valueA: 28, valueB: 72 },
              { label: "Q4", valueA: 20, valueB: 80 },
            ],
          },
          tableHeaders: ["Quarter", "Old %", "New %"],
          tableRows: [
            ["Q1", "50%", "50%"],
            ["Q2", "38%", "62%"],
            ["Q3", "28%", "72%"],
            ["Q4", "20%", "80%"],
          ],
        },
      ],
    },
    3: {
      panels: [
        {
          title: "Product E",
          status: "green",
          metrics: [
            { title: "Type 1 TTM", value: "512K" },
            { title: "Type 2 TTM", value: "488K" },
          ],
          chartType: "groupedBars",
          chartProps: {
            colorA: "#f97316",
            colorB: "#ec4899",
            labelA: "Type 1",
            labelB: "Type 2",
            data: [
              { label: "Q1", valueA: 115, valueB: 110 },
              { label: "Q2", valueA: 122, valueB: 118 },
              { label: "Q3", valueA: 130, valueB: 126 },
              { label: "Q4", valueA: 145, valueB: 134 },
            ],
          },
          tableHeaders: ["Quarter", "Type 1", "Type 2"],
          tableRows: [
            ["Q1", "115K", "110K"],
            ["Q2", "122K", "118K"],
            ["Q3", "130K", "126K"],
            ["Q4", "145K", "134K"],
          ],
        },
        {
          title: "Product F",
          status: "green",
          metrics: [
            { title: "TTM Revenue", value: "$2.8M" },
            { title: "YoY Growth", value: "+24%" },
          ],
          chartType: "stackedMonthly",
          chartProps: {
            colors: ["#1d4ed8", "#3b82f6", "#93c5fd"],
            labels: ["F1", "F2", "F3"],
            data: [
              { label: "Jul", values: [62, 42, 28] },
              { label: "Aug", values: [65, 45, 30] },
              { label: "Sep", values: [70, 48, 32] },
              { label: "Oct", values: [72, 50, 34] },
              { label: "Nov", values: [75, 52, 36] },
              { label: "Dec", values: [78, 55, 38] },
            ],
          },
          tableHeaders: ["Month", "F1", "F2", "F3"],
          tableRows: [
            ["Jul", "62", "42", "28"],
            ["Aug", "65", "45", "30"],
            ["Sep", "70", "48", "32"],
            ["Oct", "72", "50", "34"],
            ["Nov", "75", "52", "36"],
            ["Dec", "78", "55", "38"],
          ],
        },
      ],
    },
    4: {
      panels: [
        {
          title: "Product G / Bookings",
          status: "green",
          metrics: [
            { title: "X Net New Bookings (QTD)", value: "$1.8M" },
            { title: "Y Net New Bookings (QTD)", value: "$1.5M" },
          ],
          chartType: "quarterProgress",
          chartProps: {
            colorA: "#22c55e",
            colorB: "#3b82f6",
            labelA: "Product X",
            labelB: "Product Y",
            data: [
              { label: "Product X", value: 90, target: 100, color: "#22c55e" },
              { label: "Product Y", value: 75, target: 100, color: "#3b82f6" },
            ],
          },
          tableHeaders: ["Product", "QTD", "Target", "Attain %"],
          tableRows: [
            ["Product X", "$1.8M", "$2.0M", "90%"],
            ["Product Y", "$1.5M", "$2.0M", "75%"],
          ],
        },
      ],
    },
  },

  "BlueWave Tech": {
    1: {
      panels: [
        {
          title: "Product A",
          status: "green",
          metrics: [
            { title: "Seat Growth (Month)", value: "+115" },
            { title: "Seat Growth (TTM)", value: "+1,120" },
          ],
          chartType: "barTrend",
          chartProps: {
            color: "#3b82f6",
            data: [
              { label: "Jul", value: 88 },
              { label: "Aug", value: 95 },
              { label: "Sep", value: 102 },
              { label: "Oct", value: 108 },
              { label: "Nov", value: 112 },
              { label: "Dec", value: 115 },
            ],
          },
          tableHeaders: ["Month", "New Seats"],
          tableRows: [
            ["Jul", "+88"],
            ["Aug", "+95"],
            ["Sep", "+102"],
            ["Oct", "+108"],
            ["Nov", "+112"],
            ["Dec", "+115"],
          ],
        },
        {
          title: "Product B",
          status: "red",
          metrics: [
            { title: "Revenue Growth (Month)", value: "+$5K" },
            { title: "Revenue Growth (TTM)", value: "+$58K" },
          ],
          chartType: "lineTrend",
          chartProps: {
            color: "#22c55e",
            data: [
              { label: "Jul", value: 10 },
              { label: "Aug", value: 8 },
              { label: "Sep", value: 7 },
              { label: "Oct", value: 6 },
              { label: "Nov", value: 6 },
              { label: "Dec", value: 5 },
            ],
          },
          tableHeaders: ["Month", "Revenue"],
          tableRows: [
            ["Jul", "$10K"],
            ["Aug", "$8K"],
            ["Sep", "$7K"],
            ["Oct", "$6K"],
            ["Nov", "$6K"],
            ["Dec", "$5K"],
          ],
        },
      ],
    },
    2: {
      panels: [
        {
          title: "Product C",
          status: "green",
          metrics: [
            { title: "Usage (Month)", value: "88K units" },
            { title: "Usage (TTM)", value: "985K units" },
          ],
          chartType: "areaTrend",
          chartProps: {
            color: "#a855f7",
            data: [
              { label: "Jul", value: 68 },
              { label: "Aug", value: 74 },
              { label: "Sep", value: 78 },
              { label: "Oct", value: 82 },
              { label: "Nov", value: 85 },
              { label: "Dec", value: 88 },
            ],
          },
          tableHeaders: ["Month", "Usage (K)"],
          tableRows: [
            ["Jul", "68K"],
            ["Aug", "74K"],
            ["Sep", "78K"],
            ["Oct", "82K"],
            ["Nov", "85K"],
            ["Dec", "88K"],
          ],
        },
        {
          title: "Product D",
          status: "yellow",
          metrics: [
            { title: "Old Product Mix", value: "44%" },
            { title: "New Product Mix", value: "56%" },
          ],
          chartType: "splitBars",
          chartProps: {
            colorA: "#94a3b8",
            colorB: "#38bdf8",
            data: [
              { label: "Q1", valueA: 68, valueB: 32 },
              { label: "Q2", valueA: 60, valueB: 40 },
              { label: "Q3", valueA: 52, valueB: 48 },
              { label: "Q4", valueA: 44, valueB: 56 },
            ],
          },
          tableHeaders: ["Quarter", "Old %", "New %"],
          tableRows: [
            ["Q1", "68%", "32%"],
            ["Q2", "60%", "40%"],
            ["Q3", "52%", "48%"],
            ["Q4", "44%", "56%"],
          ],
        },
      ],
    },
    3: {
      panels: [
        {
          title: "Product E",
          status: "green",
          metrics: [
            { title: "Type 1 TTM", value: "368K" },
            { title: "Type 2 TTM", value: "342K" },
          ],
          chartType: "groupedBars",
          chartProps: {
            colorA: "#f97316",
            colorB: "#ec4899",
            labelA: "Type 1",
            labelB: "Type 2",
            data: [
              { label: "Q1", valueA: 82, valueB: 76 },
              { label: "Q2", valueA: 90, valueB: 82 },
              { label: "Q3", valueA: 95, valueB: 88 },
              { label: "Q4", valueA: 101, valueB: 96 },
            ],
          },
          tableHeaders: ["Quarter", "Type 1", "Type 2"],
          tableRows: [
            ["Q1", "82K", "76K"],
            ["Q2", "90K", "82K"],
            ["Q3", "95K", "88K"],
            ["Q4", "101K", "96K"],
          ],
        },
        {
          title: "Product F",
          status: "yellow",
          metrics: [
            { title: "TTM Revenue", value: "$1.4M" },
            { title: "YoY Growth", value: "+8%" },
          ],
          chartType: "stackedMonthly",
          chartProps: {
            colors: ["#1d4ed8", "#3b82f6", "#93c5fd"],
            labels: ["F1", "F2", "F3"],
            data: [
              { label: "Jul", values: [32, 22, 14] },
              { label: "Aug", values: [34, 23, 15] },
              { label: "Sep", values: [36, 24, 16] },
              { label: "Oct", values: [36, 25, 16] },
              { label: "Nov", values: [38, 26, 17] },
              { label: "Dec", values: [40, 27, 18] },
            ],
          },
          tableHeaders: ["Month", "F1", "F2", "F3"],
          tableRows: [
            ["Jul", "32", "22", "14"],
            ["Aug", "34", "23", "15"],
            ["Sep", "36", "24", "16"],
            ["Oct", "36", "25", "16"],
            ["Nov", "38", "26", "17"],
            ["Dec", "40", "27", "18"],
          ],
        },
      ],
    },
    4: {
      panels: [
        {
          title: "Product G / Bookings",
          status: "yellow",
          metrics: [
            { title: "X Net New Bookings (QTD)", value: "$1.0M" },
            { title: "Y Net New Bookings (QTD)", value: "$780K" },
          ],
          chartType: "quarterProgress",
          chartProps: {
            colorA: "#22c55e",
            colorB: "#3b82f6",
            labelA: "Product X",
            labelB: "Product Y",
            data: [
              { label: "Product X", value: 50, target: 100, color: "#22c55e" },
              { label: "Product Y", value: 39, target: 100, color: "#3b82f6" },
            ],
          },
          tableHeaders: ["Product", "QTD", "Target", "Attain %"],
          tableRows: [
            ["Product X", "$1.0M", "$2.0M", "50%"],
            ["Product Y", "$780K", "$2.0M", "39%"],
          ],
        },
      ],
    },
  },

  "Evergreen Foods": {
    1: {
      panels: [
        {
          title: "Product A",
          status: "green",
          metrics: [
            { title: "Seat Growth (Month)", value: "+158" },
            { title: "Seat Growth (TTM)", value: "+1,580" },
          ],
          chartType: "barTrend",
          chartProps: {
            color: "#3b82f6",
            data: [
              { label: "Jul", value: 120 },
              { label: "Aug", value: 132 },
              { label: "Sep", value: 140 },
              { label: "Oct", value: 148 },
              { label: "Nov", value: 154 },
              { label: "Dec", value: 158 },
            ],
          },
          tableHeaders: ["Month", "New Seats"],
          tableRows: [
            ["Jul", "+120"],
            ["Aug", "+132"],
            ["Sep", "+140"],
            ["Oct", "+148"],
            ["Nov", "+154"],
            ["Dec", "+158"],
          ],
        },
        {
          title: "Product B",
          status: "green",
          metrics: [
            { title: "Revenue Growth (Month)", value: "+$35K" },
            { title: "Revenue Growth (TTM)", value: "+$395K" },
          ],
          chartType: "lineTrend",
          chartProps: {
            color: "#22c55e",
            data: [
              { label: "Jul", value: 25 },
              { label: "Aug", value: 28 },
              { label: "Sep", value: 30 },
              { label: "Oct", value: 32 },
              { label: "Nov", value: 34 },
              { label: "Dec", value: 35 },
            ],
          },
          tableHeaders: ["Month", "Revenue"],
          tableRows: [
            ["Jul", "$25K"],
            ["Aug", "$28K"],
            ["Sep", "$30K"],
            ["Oct", "$32K"],
            ["Nov", "$34K"],
            ["Dec", "$35K"],
          ],
        },
      ],
    },
    2: {
      panels: [
        {
          title: "Product C",
          status: "green",
          metrics: [
            { title: "Usage (Month)", value: "112K units" },
            { title: "Usage (TTM)", value: "1.25M units" },
          ],
          chartType: "areaTrend",
          chartProps: {
            color: "#a855f7",
            data: [
              { label: "Jul", value: 88 },
              { label: "Aug", value: 95 },
              { label: "Sep", value: 100 },
              { label: "Oct", value: 105 },
              { label: "Nov", value: 108 },
              { label: "Dec", value: 112 },
            ],
          },
          tableHeaders: ["Month", "Usage (K)"],
          tableRows: [
            ["Jul", "88K"],
            ["Aug", "95K"],
            ["Sep", "100K"],
            ["Oct", "105K"],
            ["Nov", "108K"],
            ["Dec", "112K"],
          ],
        },
        {
          title: "Product D",
          status: "green",
          metrics: [
            { title: "Old Product Mix", value: "22%" },
            { title: "New Product Mix", value: "78%" },
          ],
          chartType: "splitBars",
          chartProps: {
            colorA: "#94a3b8",
            colorB: "#38bdf8",
            data: [
              { label: "Q1", valueA: 58, valueB: 42 },
              { label: "Q2", valueA: 44, valueB: 56 },
              { label: "Q3", valueA: 32, valueB: 68 },
              { label: "Q4", valueA: 22, valueB: 78 },
            ],
          },
          tableHeaders: ["Quarter", "Old %", "New %"],
          tableRows: [
            ["Q1", "58%", "42%"],
            ["Q2", "44%", "56%"],
            ["Q3", "32%", "68%"],
            ["Q4", "22%", "78%"],
          ],
        },
      ],
    },
    3: {
      panels: [
        {
          title: "Product E",
          status: "green",
          metrics: [
            { title: "Type 1 TTM", value: "448K" },
            { title: "Type 2 TTM", value: "415K" },
          ],
          chartType: "groupedBars",
          chartProps: {
            colorA: "#f97316",
            colorB: "#ec4899",
            labelA: "Type 1",
            labelB: "Type 2",
            data: [
              { label: "Q1", valueA: 102, valueB: 95 },
              { label: "Q2", valueA: 108, valueB: 100 },
              { label: "Q3", valueA: 115, valueB: 108 },
              { label: "Q4", valueA: 123, valueB: 112 },
            ],
          },
          tableHeaders: ["Quarter", "Type 1", "Type 2"],
          tableRows: [
            ["Q1", "102K", "95K"],
            ["Q2", "108K", "100K"],
            ["Q3", "115K", "108K"],
            ["Q4", "123K", "112K"],
          ],
        },
        {
          title: "Product F",
          status: "green",
          metrics: [
            { title: "TTM Revenue", value: "$2.4M" },
            { title: "YoY Growth", value: "+20%" },
          ],
          chartType: "stackedMonthly",
          chartProps: {
            colors: ["#1d4ed8", "#3b82f6", "#93c5fd"],
            labels: ["F1", "F2", "F3"],
            data: [
              { label: "Jul", values: [52, 36, 24] },
              { label: "Aug", values: [55, 38, 25] },
              { label: "Sep", values: [58, 40, 27] },
              { label: "Oct", values: [60, 42, 28] },
              { label: "Nov", values: [63, 44, 29] },
              { label: "Dec", values: [66, 46, 30] },
            ],
          },
          tableHeaders: ["Month", "F1", "F2", "F3"],
          tableRows: [
            ["Jul", "52", "36", "24"],
            ["Aug", "55", "38", "25"],
            ["Sep", "58", "40", "27"],
            ["Oct", "60", "42", "28"],
            ["Nov", "63", "44", "29"],
            ["Dec", "66", "46", "30"],
          ],
        },
      ],
    },
    4: {
      panels: [
        {
          title: "Product G / Bookings",
          status: "green",
          metrics: [
            { title: "X Net New Bookings (QTD)", value: "$1.6M" },
            { title: "Y Net New Bookings (QTD)", value: "$1.2M" },
          ],
          chartType: "quarterProgress",
          chartProps: {
            colorA: "#22c55e",
            colorB: "#3b82f6",
            labelA: "Product X",
            labelB: "Product Y",
            data: [
              { label: "Product X", value: 80, target: 100, color: "#22c55e" },
              { label: "Product Y", value: 60, target: 100, color: "#3b82f6" },
            ],
          },
          tableHeaders: ["Product", "QTD", "Target", "Attain %"],
          tableRows: [
            ["Product X", "$1.6M", "$2.0M", "80%"],
            ["Product Y", "$1.2M", "$2.0M", "60%"],
          ],
        },
      ],
    },
  },
};
