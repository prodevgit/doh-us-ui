$(".side-nav__btn").click(function (e) {
  $(".side-nav").toggleClass("side-nav--collapse");
});

var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

//////////////////////////////////////////////////////////

(function ($) {
  $.fn.loading = function () {
    var DEFAULTS = {
      backgroundColor: "#EAEAEA",
      progressColor: "#285B65",
      percent: 75,
      duration: 2000,
    };

    $(this).each(function () {
      var $target = $(this);

      var opts = {
        backgroundColor: $target.data("color")
          ? $target.data("color").split(",")[0]
          : DEFAULTS.backgroundColor,
        progressColor: $target.data("color")
          ? $target.data("color").split(",")[1]
          : DEFAULTS.progressColor,
        percent: $target.data("percent")
          ? $target.data("percent")
          : DEFAULTS.percent,
        duration: $target.data("duration")
          ? $target.data("duration")
          : DEFAULTS.duration,
      };

      $target.append(
        '<div class="background"></div><div class="rotate"></div><div class="left"></div><div class="right"></div><div class=""><span class="circle-inner"><span class="per">' +
          opts.percent +
          "%</span></div>"
      );

      $target.find(".background").css("background-color", opts.backgroundColor);
      $target.find(".left").css("background-color", opts.backgroundColor);
      $target.find(".rotate").css("background-color", opts.progressColor);
      $target.find(".right").css("background-color", opts.progressColor);

      var $rotate = $target.find(".rotate");
      setTimeout(function () {
        $rotate.css({
          transition: "transform " + opts.duration + "ms linear",
          transform: "rotate(" + opts.percent * 3.6 + "deg)",
        });
      }, 1);

      if (opts.percent > 50) {
        var animationRight =
          "toggle " + (opts.duration / opts.percent) * 50 + "ms step-end";
        var animationLeft =
          "toggle " + (opts.duration / opts.percent) * 50 + "ms step-start";
        $target.find(".right").css({
          animation: animationRight,
          opacity: 1,
        });
        $target.find(".left").css({
          animation: animationLeft,
          opacity: 0,
        });
      }
    });
  };
})(jQuery);

$(".circle-bar").loading();
