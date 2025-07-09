export const downloadCSV = (answers, email, language) => {
  const headers = ["order", "title", "type", "answer"];
  const csvData = [];

  // Add language  as the first entry
  csvData.push({
    order: 1,
    title: "What is your preferred language?",
    type: "single-select",
    answer: language,
  });

  const uniqueTitles = new Set(); // To track unique question titles

  // Process and format each answer

  answers.forEach((item, index) => {
    if (uniqueTitles.has(item.title)) return;
    uniqueTitles.add(item.title);

    const formattedAnswer = Array.isArray(item.answer)
      ? item.answer.map(stripEmojis).join(", ")
      : stripEmojis(item.answer);

    csvData.push({
      order: index + 2,
      title: item.title,
      type: determineType(item),
      answer: formattedAnswer,
    });
  });

  // Add user email as the last entry

  csvData.push({
    order: csvData.length + 1,
    title: "Email",
    type: "email",
    answer: email,
  });

  // Convert all data to CSV format

  const csvRows = [
    headers.join(","),
    ...csvData.map(({ order, title, type, answer }) =>
      [order, `"${title}"`, type, `"${answer}"`].join(",")
    ),
  ];

  // Create and trigger CSV file download

  const blob = new Blob(["\uFEFF" + csvRows.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quiz_answers.csv";
  a.click();
  URL.revokeObjectURL(url);
};

// Utility to remove emojis from a given string

function stripEmojis(text) {
  if (!text) return "";
  return text
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F|\u200D)+/gu,
      ""
    )
    .trim();
}

// Determines question type based on context and title
function determineType(item) {
  const title = item.title.toLowerCase();

  if (item.type === "multi") {
    return title.includes("favorite") ? "bubble" : "multiple-select";
  }

  if (title.includes("gender")) {
    return "single-select-image";
  }

  return "single-select";
}
