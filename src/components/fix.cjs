const fs = require('fs');
const file = 'PadeyeCalculator.tsx';
let content = fs.readFileSync(file, 'utf8');

const propStart = content.indexOf('// Render Property Badge');
const checkStart = content.lastIndexOf('// Render Check Badge');

const cleanCode = "// Render Property Badge\n\
const PropertyBadge = ({\n\
  label,\n\
  formula,\n\
  value,\n\
  unit,\n\
}: {\n\
  label: string;\n\
  formula: string;\n\
  value: number;\n\
  unit: string;\n\
}) => (\n\
  <div className=\"flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50/50 rounded-lg border border-slate-100 gap-2\">\n\
    <div>\n\
      <p className=\"font-medium text-sm text-slate-700\">{label}</p>\n\
      <p className=\"text-xs text-slate-500 font-mono mt-1\">{formula}</p>\n\
    </div>\n\
    <div className=\"text-right\">\n\
      <span className=\"font-mono font-bold text-amber-600 text-sm\">\n\
        {value.toFixed(2)}\n\
      </span>\n\
      <span className=\"text-xs text-slate-500 ml-1\">{unit}</span>\n\
    </div>\n\
  </div>\n\
);\n";

content = content.substring(0, propStart) + cleanCode + content.substring(checkStart);
fs.writeFileSync(file, content);
console.log('Fixed file');
