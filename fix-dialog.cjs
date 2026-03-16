const fs = require("fs");
let code = fs.readFileSync("src/components/PadeyeCalculator.tsx", "utf8");

code = code.replace(
  '<DialogTrigger asChild>\n              <button\n                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-amber-600 text-white hover:bg-amber-700 h-10 px-4 py-2"\n              >\n                <Eye className="mr-2 h-4 w-4" />\n                Preview & Export PDF\n              </button>\n            </DialogTrigger>',
  `<DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-amber-600 text-white hover:bg-amber-700 h-10 px-4 py-2">
                <Eye className="mr-2 h-4 w-4" />
                Preview & Export PDF
            </DialogTrigger>`,
);

code = code.replace("DialogDescription,", "");

fs.writeFileSync("src/components/PadeyeCalculator.tsx", code);
console.log("Fixed");
