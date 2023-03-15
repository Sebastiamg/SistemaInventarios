import React from 'react'
import * as Excel from 'exceljs'

const FAExport = ({ allItems }) => {
  async function exportItems() {
    // Doc
    const workBook = new Excel.Workbook()

    // Sheet
    const workSheet = workBook.addWorksheet('Electronic Equipmet')

    //  columns
    const columns = Object.keys(allItems[1])
      .filter((key) => key !== 'assetDetails')
      .map((column) => (column = { header: column, key: column, width: 15 }))

    // add columns
    workSheet.columns = columns

    // first column bold
    workSheet.getRow(1).font = { bold: true }

    // add Data
    for (let i = 0; i < allItems.length; i++) {
      const data = allItems[i]
      //   console.log(data)

      const row = Object.values(data).filter((key) => key !== '')
      //   console.log(row)
      workSheet.addRow(row)
    }

    // Dont't show empty cells
    workSheet.eachRow({ includeEmpty: false }, (row) => {
      // store each cell to currentCell
      const currentCell = row._cells

      // loop through currentCell to apply border only for the non-empty cell
      currentCell.forEach((singleCell) => {
        // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
        const cellAddress = singleCell._address
        // apply border
        workSheet.getCell(cellAddress).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
        workSheet.getCell(cellAddress).alignment = { horizontal: 'center' }
      })
    })

    await workBook.xlsx.writeBuffer('xd.xlsx').then((res) => {
      let blob = new Blob([res])
      let url = window.URL.createObjectURL(blob)
      let a = document.createElement('a')
      document.body.appendChild(a)
      a.href = url
      a.download = 'Electronic Items.xlsx'
      a.click()
    })
  }

  return (
    <button
      className="border-2 border-slate-600 rounded-md bg-slate-500 text-slate-50 px-2 hover:bg-slate-600 transition-all"
      onClick={exportItems}
      disabled={allItems.length ? false : true}
    >
      Export
    </button>
  )
}

export default FAExport
