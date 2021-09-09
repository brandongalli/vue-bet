export default {
  // For mapping data...
  general: {
    // "name|nameSortable|as;name|nameSortable|as;" (Generally, if you use many blanks, you're better off with another format)
    participants (input) {
      let output = []
      input.split(';').forEach(item => {
        let names = item.split('|')
        output.push({ name: names[0], nameSortable: names[1], as: names[2] })
      })
      return output
    },
    // "name|nameSortable;name|nameSortable;" (Generally, if you use many blanks, you're better off with another format)
    sortablePersons (input) {
      let output = []
      input.split(';').forEach(item => {
        let names = item.split('|')
        output.push({ name: names[0], nameSortable: names[1], as: names[2] })
      })
      return output
    },
    // "var1;var2;var3" (no final semicolon - doing so will mean an empty string)
    list (input) {
      return input.split(';')
    }
  },
  // For mapping app logic
  control: {
    enum (input) {
    },
    enumSnap (input) {
    },
    boolean (input) {
    }
  }
}
