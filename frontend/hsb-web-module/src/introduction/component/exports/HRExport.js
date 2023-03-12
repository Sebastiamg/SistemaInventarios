import React from 'react';
import * as Excel from "exceljs";

export const HRExport = (props) => {
    const { userName, userObject, columns } = props;

    const createExcel = async () => {
        try {
            const hola = "hola"
            // new Excel doc
            const workBook = new Excel.Workbook();

            // new doc sheet
            const workSheet = workBook.addWorksheet(`${userName}'s vacations`);

            // columns
            workSheet.columns = columns;

            // first Column with font bold
            workSheet.getRow(1).font = { bold: true };


            // add data
            const vac = userObject.vacations
            const vacations = vac.sort((a,b) => new Date(b.startVacationDay) - new Date(a.startVacationDay))

            vacations.forEach(singleData => {
                workSheet.addRow(singleData)
            })


            //add added and taken days
            workSheet.getColumn("A").eachCell( cell => {
                if (cell._row._number === userObject.vacations.length + 1) {
                    let lastCell = cell._row._number;
                    // add AddedDays
                    workSheet.getCell(lastCell + 1, 1).value = "Added Days";
                    workSheet.getCell(lastCell + 1, 1).font = {bold: true};
                    workSheet.getCell(lastCell + 1, 2).value = userObject.addedDays;

                    // add Takendays
                    workSheet.getCell(lastCell + 2, 1).value = "Taken Days";
                    workSheet.getCell(lastCell + 2, 1).font = {bold: true};
                    workSheet.getCell(lastCell + 2, 2).value = userObject.takenDays;
                }
            })

            // add AddedDays and TakenDays
            const row = workSheet.addRow({addedDays: userObject.addedDays, takenDays: userObject.takenDays});

            // Dont't show empty cells
            workSheet.eachRow({ includeEmpty: false }, row => {
                // store each cell to currentCell
                const currentCell = row._cells;

                // loop through currentCell to apply border only for the non-empty cell
                currentCell.forEach(singleCell => {
                    // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
                    const cellAddress = singleCell._address;
                    // apply border
                    workSheet.getCell(cellAddress).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                    workSheet.getCell(cellAddress).alignment = {horizontal: 'center'}
                });
            });

            // save xlsx
            await workBook.xlsx.writeBuffer("xd.xlsx").then(res => {

                let blob = new Blob([res]);
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.download = `${userName}.xlsx`;
                a.click();
            })

        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className='bg-slate-700 text-slate-200 font-semibold rounded-t-md p-1 w-1/5 flex items-center justify-evenly cursor-pointer hover:bg-slate-900 transition-all ml-auto'
            onClick={createExcel}>
            <div>Export</div>
            <div className='text-lime-500'>
                <i className="fa-sharp fa-solid fa-file-excel"></i>
            </div>
        </div>
    )
}
