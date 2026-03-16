const fs = require('fs');
const file = 'PadeyeCalculator.tsx';
let content = fs.readFileSync(file, 'utf8');

const start = content.indexOf('{/* 4.1 Section I-I NEW DARK TABLE UI */}');
const end = content.indexOf('{/* 4.2 Section II-II */}');

console.log('start:', start, 'end:', end);
if (start > -1 && end > -1) {
  let oldStr = content.substring(start, end);
  let newStr = "{/* 4.1 Section I-I */}\n              <div className=\"space-y-3\">\n                <h3 className=\"text-xs font-bold text-slate-500 uppercase tracking-widest border-b pb-1\">\n                  4.1 — Check Tensile Strength • Section I-I\n                </h3>\n                <div className=\"grid grid-cols-1 gap-2\">\n                  <PropertyBadge\n                    label=\"Required stress du\"\n                    formula=\"F1 / A_I-I\"\n                    value={du1 / 10}\n                    unit=\"kG/cm²\"\n                  />\n                  <CheckBadge\n                    label=\"(4.1-1) Tensile Rupture\"\n                    value={r411}\n                    limit={1.0}\n                    isUnity={true}\n                  />\n                  <CheckBadge\n                    label=\"(4.1-2) Tensile Yielding\"\n                    value={r412}\n                    limit={1.0}\n                    isUnity={true}\n                  />\n                  <CheckBadge\n                    label=\"(4.1-3) Combined T+S\"\n                    value={r413}\n                    limit={1.0}\n                    isUnity={true}\n                  />\n                </div>\n              </div>\n\n              ";
  content = content.replace(oldStr, newStr);
  fs.writeFileSync(file, content);
  console.log('Successfully replaced text!');
}
