const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "src", "components", "PadeyeCalculator.tsx");
let code = fs.readFileSync(file, "utf8");

const startStr = '<div className="flex items-center gap-2">';
const endStr = "</PDFDownloadLink>\n                </div>";

const start = code.indexOf(startStr);
const end = code.indexOf(endStr, start) + endStr.length;

if (start !== -1 && end !== -1) {
  const snippet = code.substring(start, end);
  code = code.replace(snippet, "");
  code = code.replace(
    'className="px-6 py-4 border-b shrink-0 flex flex-row items-center justify-between"',
    'className="px-6 py-4 border-b shrink-0 flex flex-row items-center"',
  );

  // Also remove PDFDownloadLink import if unused
  code = code.replace(
    'import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";',
    'import { PDFViewer } from "@react-pdf/renderer";',
  );
  fs.writeFileSync(file, code);
  console.log("Removed Successfully");
} else {
  console.log("Could not find boundaries", start, end);
}
