// Change slider values when user moves slider
$("#m1").bootstrapSlider();
$("#m1").on("slide", function(slideEvt) {
    $("#m1SliderVal").text(slideEvt.value);
});

$("#r1").bootstrapSlider();
$("#r1").on("slide", function(slideEvt) {
    $("#r1SliderVal").text(slideEvt.value);
});

$("#v0").bootstrapSlider();
$("#v0").on("slide", function(slideEvt) {
    $("#v0SliderVal").text(slideEvt.value);
});

$("#deg").bootstrapSlider();
$("#deg").on("slide", function(slideEvt) {
    $("#degSliderVal").text(slideEvt.value);
});

