import { Position } from 'scripts/scene/type';

interface ConfigPointsGrid {
    rows: number;
    collumns: number;
    widthCell: number;
    heightCell: number;
}

// сетка с центром x: 0 y: 0
export function createPointsGrid({
    rows,
    collumns,
    widthCell,
    heightCell,
}: ConfigPointsGrid): Position[] {
    let points: Position[] = [];

    const isEvenNumber = (arg: number): boolean => arg % 2 === 0;

    const isEvenRows = isEvenNumber(rows);
    const isEvenCollumns = isEvenNumber(collumns);

    let startX = isEvenRows ? widthCell / 2 : 0;
    let startY = isEvenCollumns ? heightCell / 2 : 0;

    const lengthX = isEvenRows ? rows / 2 : (rows + 1) / 2;
    const lengthY = isEvenCollumns ? collumns / 2 : (collumns + 1) / 2;

    const row: number[] = [];

    for (let i = 0; i < lengthX; i++) {
        const x = startX + i * widthCell;

        row.push(x);

        if (i === 0 && !isEvenRows) continue;

        row.unshift(-x);
    }

    for (let i = 0; i < row.length; i++) {
        const x = row[i];
        //для сохранения индекса
        const tempArr = [];

        for (let j = 0; j < lengthY; j++) {
            const y = startY + j * heightCell;

            tempArr.unshift({ x, y: -y });

            if (j === 0 && !isEvenCollumns) continue;

            tempArr.push({ x, y });
        }

        points = [...points, ...tempArr];
    }

    return points;
}
