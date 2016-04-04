    var checkBoxOptions = {
        id: "",
        checkedGlyph: "glyphicon-ok-circle",
        uncheckedGlyph: "glyphicon-unchecked",
        checkedBtnClass: "btn-success",
        uncheckedBtnClass: "btn-primary",
        checkedText: "Selected",
        uncheckedText: "Not Selected"
    }

    function setChecked(ctl) {
        $(ctl).prev()
            .removeClass(checkBoxOptions.uncheckedGlyph)
            .addClass(checkBoxOptions.checkedGlyph);

        $(ctl).parent()

        .removeClass(checkBoxOptions.uncheckedBtnClass)
            .addClass(checkBoxOptions.checkedBtnClass)
        $($(ctl).next()).text(checkBoxOptions.checkedText);
    }

    function setUnchecked(ctl) {
        $(ctl).prev()
            .removeClass(checkBoxOptions.checkedGlyph)
            .addClass(checkBoxOptions.uncheckedGlyph);

        $(ctl).parent()

        .removeClass(checkBoxOptions.checkedBtnClass)
            .addClass(checkBoxOptions.uncheckedBtnClass)
        $($(ctl).next()).text(checkBoxOptions.uncheckedText);
    }


    function calculateTotal(ctl) {
        var total = $("#total").text();

        total = stripCurrency(total);

        var price = $(ctl).closest('section').find('.price').text();

        price = stripCurrency(price);

        if ($(ctl).prop('checked')) {
            total = parseFloat(total) + parseFloat(price);
        } else {
            total = parseFloat(total) - parseFloat(price);
        }
        $("#total").text(formatCurrency(total));
    }

    function stripCurrency(value, symbol, seperator) {
        symbol = (typeof symbol == "undefined" ? "$" : symbol);
        seperator = (typeof seperator == "undefined" ? "," : seperator)
        value = value.replace(symbol, "")
            .replace(seperator, "")
            .replace(" ", "");
        return value;
    }

    function formatCurrency(value, decimals, decpoint, symbol, seperator) {
        decimals = (typeof decimals == 'undefined' ? 2 : decimals);
        decpoint = (typeof decpoint == 'undefined' ? "." : decpoint);
        symbol = (typeof symbol == 'undefined' ? "$" : symbol);
        seperator = (typeof seperator == 'undefined' ? "," : seperator)

        var parts = value.toFixed(decimals)
            .toString()
            .split(decpoint)

        parts[0] = parts[0].replace(/\B(?=(\d{3}) + (?!\d))/g, seperator);
        return (symbol + parts.join(decpoint)).toLocaleString();
    }


$(document).ready(function(){
  $(checkBoxOptions.id + " .btn-group input[type='checkbox']")
      .change(function() {
          if ($(this).prop("checked")) {
              setChecked($(this));
          } else {
              setUnchecked($(this));
          }
      });
  var checked = $(checkBoxOptions.id + " .btn-group input:checked")
  setChecked(checked);

  $("input[type='checkbox']").change(function() {
      if ($(this).prop('checked')) {
          console.log(checkBoxOptions.checkedGlyph)
          $(this).prev()
              .removeClass('glyphicon-unchecked')
              .addClass('glyphicon-ok-circle')
          $(this).parent()
              .removeClass('btn-primary')
              .addClass('btn-success');
          $(this).next().text("Selected");
      } else {
          $(this).prev()
              .removeClass('glyphicon-ok-circle')
              .addClass('glyphicon-unchecked');
          $(this).parent()
              .removeClass('btn-success')
              .addClass('btn-primary');
          $(this).next().text("Not Selected")
      }
  })
  $(".btn-group input[type='checkbox']").change(function () {
      calculateTotal($(this));
    });

    // Get checkboxes that are checked
    var checked = $(".btn-group input:checked");
    // Add all 'checked' values to get total
    for (var i = 0; i < checked.length; i++) {
      calculateTotal($(checked[i]));
    }
});
