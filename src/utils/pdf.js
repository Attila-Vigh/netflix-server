import PdfPrinter from "pdfmake"

const fonts = {
  Roboto: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
}

export const getPDFReadableStream = data => {
  const printer = new PdfPrinter(fonts)

  const docDefinition = {
    content: [data.firstName, `Another paragraph, this time a ${data.lastName}`],
  }
  const options = {}
  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, options)

  pdfReadableStream.end()
  return pdfReadableStream
}
