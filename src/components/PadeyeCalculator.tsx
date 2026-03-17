import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Calculator, Ruler, Target, CheckSquare } from "lucide-react";
import { InputSection } from "./calculator/InputSection";
import { DimensionSection } from "./calculator/DimensionSection";
import { StrengthSection } from "./calculator/StrengthSection";
import { ConclusionSection } from "./calculator/ConclusionSection";
import { PadeyeProvider, usePadeye } from "./calculator/PadeyeContext";
import { ModeToggle } from "./mode-toggle";
import { CanvasText } from "./ui/canvas-text";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { PadeyePDFReport } from "./PadeyePDFReport";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function AppLayout() {
  const [activeTab, setActiveTab] = useState("Input");
  const [open, setOpen] = useState(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);

  const contextData = usePadeye();

  const links = [
    {
      label: "Input",
      icon: (
        <Calculator className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      onClick: () => {
        setActiveTab("Input");
        if (window.innerWidth < 768) setOpen(false);
      },
    },
    {
      label: "Dimension Check",
      icon: (
        <Ruler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      onClick: () => {
        setActiveTab("Dimension Check");
        if (window.innerWidth < 768) setOpen(false);
      },
    },
    {
      label: "Strength Check",
      icon: (
        <Target className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      onClick: () => {
        setActiveTab("Strength Check");
        if (window.innerWidth < 768) setOpen(false);
      },
    },
    {
      label: "Conclusion",
      icon: (
        <CheckSquare className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      onClick: () => {
        setActiveTab("Conclusion");
        if (window.innerWidth < 768) setOpen(false);
      },
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden relative">
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <Sidebar
        open={open}
        setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 border-r border-border dark:bg-neutral-900 bg-neutral-50 h-full">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? (
              <h2 className="text-2xl font-bold font-['Montserrat'] whitespace-nowrap mb-8 mt-2 text-neutral-800 dark:text-neutral-200">
                Padeye{" "}
                <CanvasText
                  text="Check"
                  backgroundClassName="bg-orange-500 !text-white"
                  colors={["rgba(249,115,22,1)"]}
                />
              </h2>
            ) : (
              <div className="h-8 mb-8 mt-4 w-full flex items-center justify-center font-bold text-xl text-neutral-800 dark:text-neutral-200">
                P
              </div>
            )}

            <div className="flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={`px-2 py-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === link.label
                      ? "bg-muted font-bold"
                      : "hover:bg-muted/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div
            className={cn(
              "mt-auto pb-4 flex w-full",
              open ? "px-2 justify-start" : "px-0 justify-center",
            )}>
            {/* {open && (
              <div className="text-xs text-muted-foreground mb-2">Theme</div>
            )} */}
            <ModeToggle />
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 w-full min-h-full">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="border-b border-border/50 pb-4 mb-8">
              <h1 className="text-3xl font-bold font-['Montserrat'] tracking-tight text-neutral-800 dark:text-neutral-100">
                {activeTab}
              </h1>
            </div>

            {activeTab === "Input" && <InputSection />}
            {activeTab === "Dimension Check" && <DimensionSection />}
            {activeTab === "Strength Check" && <StrengthSection />}
            {activeTab === "Conclusion" && <ConclusionSection />}
          </div>
        </div>
      </main>
      <button
        onClick={() => setPdfDialogOpen(true)}
        className="fixed bottom-6 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center group z-50"
        title="Export to PDF">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line
            x1="16"
            y1="13"
            x2="8"
            y2="13"></line>
          <line
            x1="16"
            y1="17"
            x2="8"
            y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <span className="font-semibold px-1">Export PDF</span>
      </button>
      <Dialog
        open={pdfDialogOpen}
        onOpenChange={setPdfDialogOpen}>
        <DialogContent className="max-w-7xl xl:max-w-[1400px] w-[95vw] md:w-[90vw] h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b shrink-0 flex flex-row items-center">
            <DialogTitle className="text-left font-bold text-lg m-0 p-0">
              PDF Report Preview
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full bg-muted/30 relative">
            <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center bg-background z-10 p-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground mb-4 opacity-50">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line
                  x1="16"
                  y1="13"
                  x2="8"
                  y2="13"></line>
                <line
                  x1="16"
                  y1="17"
                  x2="8"
                  y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <h3 className="text-lg font-semibold mb-2">
                Mobile Preview Unavailable
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                PDF preview is only available on desktop devices. Please
                download the file to view it.
              </p>
              <PDFDownloadLink
                document={
                  <PadeyePDFReport
                    inputs={contextData.inputs}
                    loads={{ F1: contextData.F1, F2: contextData.F2 }}
                    clearances={{
                      pinClearance: contextData.pinClearance,
                      sideClearance: contextData.sideClearance,
                      shackleFit: contextData.shackleFit,
                      cheekClearance: contextData.cheekClearance,
                    }}
                    unityChecks={contextData.unityChecks}
                    maxUC={contextData.maxUC}
                    governingUC={contextData.governingUC}
                    selectedMaterial={contextData.selectedMaterial}
                  />
                }
                fileName="Padeye_Calculation_Report.pdf"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-base font-semibold transition-colors shadow-sm w-full max-w-[250px]">
                {({ loading }) =>
                  loading ? "Generating Document..." : "Download PDF"
                }
              </PDFDownloadLink>
            </div>

            <PDFViewer
              width="100%"
              height="100%"
              className="border-0 hidden md:block">
              <PadeyePDFReport
                inputs={contextData.inputs}
                loads={{ F1: contextData.F1, F2: contextData.F2 }}
                clearances={{
                  pinClearance: contextData.pinClearance,
                  sideClearance: contextData.sideClearance,
                  shackleFit: contextData.shackleFit,
                  cheekClearance: contextData.cheekClearance,
                }}
                unityChecks={contextData.unityChecks}
                maxUC={contextData.maxUC}
                governingUC={contextData.governingUC}
                selectedMaterial={contextData.selectedMaterial}
              />
            </PDFViewer>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function PadeyeCalculator() {
  return (
    <PadeyeProvider>
      <AppLayout />
    </PadeyeProvider>
  );
}
