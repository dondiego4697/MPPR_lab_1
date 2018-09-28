const fs = require('fs');

const jsons = fs.readdirSync(`${process.cwd()}/json`).filter(n => n.indexOf('.json') !== -1);

jsons.forEach((j) => {
    const rowData = fs.readFileSync(`${process.cwd()}/json/${j}`);
    const data = JSON.parse(rowData);

    const result = data.map((day) => {
        return day.map((part) => {
            let res = '';
            if (part.title === 'Итог') {
                res += `Итог: ${part.day} \n`;
                res += `${part.materials.join(', ')}`;
                return res;
            }

            res += `${part.title}, ${part.name}\n`;
            res += `Изображение: ${part.img}\n`;
            res += part.data.map((d) => {return `${d.type}: ${d.amount}`}).join(', ');
            return res;
        }).join(`\n\n`);
    }).join(`\n${Array(100).join('=')}\n\n`);

    fs.writeFileSync(`${process.cwd()}/human-readable/${j.replace('.json', '.txt')}`, result);
});
