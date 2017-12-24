function csvExport() {

    var text = "Name, Reps, Weight, Unit, Date, \n";
    var tab = document.getElementById('myTable');

    for (var j = 1; j < tab.rows.length; j++) {

      var row = tab.rows[j];
      var children = row.childNodes;

      for (var i = 0; i < children.length - 2; i++) {
        text += children[i].innerHTML + ',';
      }
      text += "\n";
    }

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=UTF-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'file.csv');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

}
