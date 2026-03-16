const fs = require("fs");
let code = fs.readFileSync("src/components/PadeyeCalculator.tsx", "utf8");

const regex =
  /\{\/\* RESULTS COLUMN \*\/\}[\s\S]*?(?=\{\/\* SUMMARY CARD \*\/)/;
const match = code.match(regex);

const payload = `{/* RESULTS COLUMN */}
      <div className="lg:col-span-8 xl:col-span-8 space-y-6">
        <div className="flex justify-end relative z-10 block">
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-amber-600 text-white hover:bg-amber-700 h-10 px-4 py-2"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview & Export PDF
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-[90vw] h-[90vh] flex flex-col p-0 overflow-hidden">
              <DialogHeader className="px-6 py-4 border-b shrink-0 flex flex-row items-center justify-between">
                <div>
                  <DialogTitle className="text-left font-bold text-lg">PDF Report Preview</DialogTitle>
                </div>
                <div className="flex items-center gap-2">
                  <PDFDownloadLink
                    document={
                      <PadeyePDFReport
                        inputs={inputs}
                        loads={{ F1, F2 }}
                        clearances={{
                          pinClearance,
                          sideClearance,
                          shackleFit,
                          cheekClearance,
                        }}
                        unityChecks={unityChecks}
                        maxUC={maxUC}
                        governingUC={governingUC}
                        selectedMaterial={selectedMaterial}
                      />
                    }
                    fileName="Padeye_Report.pdf"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white hover:bg-emerald-700 h-10 px-4 py-2"
                  >
                    {({ loading }) =>
                      loading ? (
                        "Preparing..."
                      ) : (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          Download PDF
                        </>
                      )
                    }
                  </PDFDownloadLink>
                </div>
              </DialogHeader>
              <div className="flex-1 w-full bg-muted/30">
                <PDFViewer width="100%" height="100%" className="border-0">
                  <PadeyePDFReport
                    inputs={inputs}
                    loads={{ F1, F2 }}
                    clearances={{
                      pinClearance,
                      sideClearance,
                      shackleFit,
                      cheekClearance,
                    }}
                    unityChecks={unityChecks}
                    maxUC={maxUC}
                    governingUC={governingUC}
                    selectedMaterial={selectedMaterial}
                  />
                </PDFViewer>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        `;

if (match) {
  code = code.replace(match[0], payload);
  fs.writeFileSync("src/components/PadeyeCalculator.tsx", code);
  console.log("Success");
}
