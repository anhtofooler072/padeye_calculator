import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Calculator, Ruler, Target, CheckSquare, FileText } from "lucide-react";
import { InputSection } from "./calculator/InputSection";
import { DimensionSection } from "./calculator/DimensionSection";
import { StrengthSection } from "./calculator/StrengthSection";
import { ConclusionSection } from "./calculator/ConclusionSection";
import { PadeyeProvider, usePadeye } from "./calculator/PadeyeContext";
import { ModeToggle } from "./mode-toggle";
import { CanvasText } from "./ui/canvas-text";
import { PDFViewer } from "@react-pdf/renderer";
import { PadeyePDFReport } from "./PadeyePDFReport";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function AppLayout() {
  const [activeTab, setActiveTab] = useState("INPUT");
  const [open, setOpen] = useState(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);

  const contextData = usePadeye();

  const links = [
    {
      label: "INPUT",
      icon: (
        <Calculator className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      onClick: () => setActiveTab("INPUT"),
    },
    {
      label: "DIMENSION CHECK",
      icon: (
        <Ruler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      onClick: () => setActiveTab("DIMENSION CHECK"),
    },
    {
      label: "STRENGTH CHECK",
      icon: (
        <Target className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      onClick: () => setActiveTab("STRENGTH CHECK"),
    },
    {
      label: "CONCLUSION",
      icon: (
        <CheckSquare className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      onClick: () => setActiveTab("CONCLUSION"),
    },
    {
      label: "EXPORT TO PDF",
      icon: (
        <FileText className="text-amber-600 dark:text-amber-500 h-5 w-5 shrink-0" />
      ),
      onClick: () => setPdfDialogOpen(true),
    },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

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
                <div
                  key={idx}
                  className={`rounded-lg transition-colors cursor-pointer ${
                    activeTab === link.label && link.label !== "EXPORT TO PDF"
                      ? "bg-muted font-bold"
                      : "hover:bg-muted/50"
                  }`}>
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto px-2 pb-4">
            {open && (
              <div className="text-xs text-muted-foreground mb-2">Theme</div>
            )}
            <ModeToggle />
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-10 w-full min-h-full">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="border-b border-border/50 pb-4 mb-8">
              <h1 className="text-3xl font-bold font-['Montserrat'] tracking-tight text-neutral-800 dark:text-neutral-100">
                {activeTab}
              </h1>
            </div>

            {activeTab === "INPUT" && <InputSection />}
            {activeTab === "DIMENSION CHECK" && <DimensionSection />}
            {activeTab === "STRENGTH CHECK" && <StrengthSection />}
            {activeTab === "CONCLUSION" && <ConclusionSection />}
          </div>
        </div>
      </main>

      <Dialog
        open={pdfDialogOpen}
        onOpenChange={setPdfDialogOpen}>
        <DialogContent className="max-w-7xl xl:max-w-[1400px] w-[95vw] md:w-[90vw] h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b shrink-0 flex flex-row items-center">
            <DialogTitle className="text-left font-bold text-lg">
              PDF Report Preview
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full bg-muted/30">
            <PDFViewer
              width="100%"
              height="100%"
              className="border-0">
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
