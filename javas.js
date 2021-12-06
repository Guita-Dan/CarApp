/** Simple JavaScript Quiz
 * version 0.1.0
 * http://journalism.berkeley.edu
 * created by: Jeremy Rue @jrue
 *
 * Copyright (c) 2013 The Regents of the University of California
 * Released under the GPL Version 2 license
 * https://www.opensource.org/licenses/gpl-2.0.php
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */
var quiztitle = "Quiz Title";
/**
 * Set the information about your questions here. The correct answer string needs to match
 * the correct choice exactly, as it does string matching. (case sensitive)
 *
 */
var quiz = [{
    "question": "Does it Start?",
    "image": "https://static.vecteezy.com/system/resources/previews/001/363/767/non_2x/fingers-pressing-car-start-button-free-photo.jpg",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": "Albert Einstein",
    "explanation": "Albert Einstein drafted the special theory of relativity in 1905.",
  },
  {
    "question": "Q2: Who is on the two dollar bill?",
    "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/9/94/US_%242_obverse-high.jpg/320px-US_%242_obverse-high.jpg",
    "choices": [
      "Thomas Jefferson",
      "Dwight D. Eisenhower",
      "Benjamin Franklin",
      "Abraham Lincoln"
    ],
    "correct": "Thomas Jefferson",
    "explanation": "The two dollar bill is seldom seen in circulation. As a result, some businesses are confused when presented with the note.",
  },
  {
    "question": "Q3: What event began on April 12, 1861?",
    "image": "",
    "choices": [
      "First manned flight",
      "California became a state",
      "American Civil War began",
      "Declaration of Independence"
    ],
    "correct": "American Civil War began",
    "explanation": "South Carolina came under attack when Confederate soldiers attacked Fort Sumter. The war lasted until April 9th 1865.",
  },
];
/******* No need to edit below this line *********/
var currentquestion = 0,
  score = 0,
  submt = true,
  picked;
jQuery(document).ready(function(e) {
  function h(i) {
    return e(document.createElement("div")).text(i).html()
  }

  function b(k) {
    if (typeof k !== "undefined" && e.type(k) == "array") {
      e("#choice-block").empty();
      for (var j = 0; j < k.length; j++) {
        e(document.createElement("li")).addClass("choice choice-box").attr("data-index", j).text(k[j]).appendTo("#choice-block")
      }
    }
  }

  function d() {
    submt = true;
    e("#explanation").empty();
    e("#question").text(quiz[currentquestion]["question"]);
    e("#pager").text("Question " + Number(currentquestion + 1) + " of " + quiz.length);
    if (quiz[currentquestion].hasOwnProperty("image") && quiz[currentquestion]["image"] != "") {
      if (e("#question-image").length == 0) {
        e(document.createElement("img")).addClass("question-image").attr("id", "question-image").attr("src", quiz[currentquestion]["image"]).attr("alt", h(quiz[currentquestion]["question"])).insertAfter("#question")
      } else {
        e("#question-image").attr("src", quiz[currentquestion]["image"]).attr("alt", h(quiz[currentquestion]["question"]))
      }
    } else {
      e("#question-image").remove()
    }
    b(quiz[currentquestion]["choices"]);
    c()
  }

  function f(i) {
    if (quiz[currentquestion]["choices"][i] == quiz[currentquestion]["correct"]) {
      e(".choice").eq(i).css({
        "background-color": "#50D943"
      });
      e("#explanation").html("<strong>Correct!</strong> " + h(quiz[currentquestion]["explanation"]));
      score++
    } else {
      e(".choice").eq(i).css({
        "background-color": "#D92623"
      });
      e("#explanation").html("<strong>Incorrect.</strong> " + h(quiz[currentquestion]["explanation"]))
    }
    currentquestion++;
    e("#submitbutton").html("NEXT QUESTION &raquo;").on("click", function() {
      if (currentquestion == quiz.length) {
        a()
      } else {
        e(this).text("Check Answer").css({
          color: "#222"
        }).off("click");
        d()
      }
    })
  }

  function c() {
    e(".choice").on("mouseover", function() {
      e(this).css({
        "background-color": "#e1e1e1"
      })
    });
    e(".choice").on("mouseout", function() {
      e(this).css({
        "background-color": "#fff"
      })
    });
    e(".choice").on("click", function() {
      picked = e(this).attr("data-index");
      e(".choice").removeAttr("style").off("mouseout mouseover");
      e(this).css({
        "border-color": "#222",
        "font-weight": 700,
        "background-color": "#c1c1c1"
      });
      if (submt) {
        submt = false;
        e("#submitbutton").css({
          color: "#000"
        }).on("click", function() {
          e(".choice").off("click");
          e(this).off("click");
          f(picked)
        })
      }
    })
  }

  function a() {
    e("#explanation").empty();
    e("#question").empty();
    e("#choice-block").empty();
    e("#submitbutton").remove();
    e("#question").text("You got " + score + " out of " + quiz.length + " correct.");
    e(document.createElement("h2")).css({
      "text-align": "center",
      "font-size": "4em"
    }).text(Math.round(score / quiz.length * 100) + "%").insertAfter("#question")
  }

  function g() {
    if (typeof quiztitle !== "undefined" && e.type(quiztitle) === "string") {
      e(document.createElement("h1")).text(quiztitle).appendTo("#frame")
    } else {
      e(document.createElement("h1")).text("Quiz").appendTo("#frame")
    }
    if (typeof quiz !== "undefined" && e.type(quiz) === "array") {
      e(document.createElement("p")).addClass("pager").attr("id", "pager").text("Question 1 of " + quiz.length).appendTo("#frame");
      e(document.createElement("h2")).addClass("question").attr("id", "question").text(quiz[0]["question"]).appendTo("#frame");
      if (quiz[0].hasOwnProperty("image") && quiz[0]["image"] != "") {
        e(document.createElement("img")).addClass("question-image").attr("id", "question-image").attr("src", quiz[0]["image"]).attr("alt", h(quiz[0]["question"])).appendTo("#frame")
      }
      e(document.createElement("p")).addClass("explanation").attr("id", "explanation").html("&nbsp;").appendTo("#frame");
      e(document.createElement("ul")).attr("id", "choice-block").appendTo("#frame");
      b(quiz[0]["choices"]);
      e(document.createElement("div")).addClass("choice-box").attr("id", "submitbutton").text("Check Answer").css({
        "font-weight": 700,
        color: "#222",
        padding: "30px 0"
      }).appendTo("#frame");
      c()
    }
  }
  g()
});
