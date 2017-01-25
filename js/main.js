"use strict";

var regExp = /president trump/gi;
var audioFileName = chrome.extension.getURL("audio/black-hole-sun.mp3");
var audio = new Audio(audioFileName);
var playing = false;
var nodes = {};

function getNodes() {
  /*
   * Get a list of all the elements within the viewport.
   */
  var height = window.innerHeight;
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, function(node) {
    return NodeFilter.FILTER_ACCEPT;
  }, true);

  var nodes = {};

  var node;
  var rect;
  while (walker.nextNode()) {
    node = walker.currentNode;
    rect = node.getBoundingClientRect();
    if (rect.top < height) {
      // element is in the first scroll of the screen
      nodes[node] = node;
    }
  }
  return nodes;
}

function each(mark) {
  var el = mark.parentNode;
  if (!playing  && nodes[el] !== undefined) {
    audio.play();
    playing = true;
  }
}

function onScroll() {
  nodes = getNodes();
  $("body").markRegExp(regExp, {
    each: each
  });
}

///////// INIT /////////////
$(document).ready(function() {
  onScroll();
  $(window).scroll(onScroll);
});
