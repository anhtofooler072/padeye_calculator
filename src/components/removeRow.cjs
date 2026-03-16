const fs = require('fs');
const file = 'PadeyeCalculator.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = 'const UnityResultRow = ({';
const endStr = '// Render Property Badge';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex > -1 && endIndex > -1) {
  content = content.substring(0, startIndex) + content.substring(endIndex);
  fs.writeFileSync(file, content);
  console.log('Removed UnityResultRow');
} else {
  console.log('Could not find start or end', startIndex, endIndex);
}
