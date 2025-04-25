//var spec = "./data/zoomable-tree-layout.json";
//vegaEmbed('#vis', spec).then(function (result) {
// Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
//}).catch(console.error);
import { getNodeId, updateRange } from './SplinesController.js'


let currentTime = 0;
let annotationTime = 0;
var text;
var button;
var buttonCancel;

//const getNodeId = require('./app.js');

var runtime;
var view;

let contextMenu = document.getElementById("context-menu");
let scope = document.querySelector("body");

import {dataFile} from "./SplinesController.js"

export function initVega() {

    contextMenu = document.getElementById("context-menu");
    scope = document.querySelector("body");

    fetch('rootui5sys/eve7/lib/tree-layout-edits.json')
        .then((response) => response.json())
        .then(spec => {

            //console.log("spec", spec);
            console.log("dataFile value:", spec.data[spec.data.length - 1].url);
            spec.data[0].url = `rootui5sys/eve7/lib/data/${dataFile}.json`;

            spec.data[spec.data.length - 1].url = `rootui5sys/eve7/lib/data/${dataFile}_header.json`;  // For timeInfo data
            runtime = vega.parse(spec); // may throw an Error if parsing fails
            view = new vega.View(runtime)
                .logLevel(vega.Warn) // set view logging level
                .initialize(document.querySelector("#vis")) // set parent DOM element
                .renderer("svg") // set render type (defaults to canvas)
                .hover() // enable hover event processing
                .run(); // update and render the view

            // react to the label event stream
            view.addSignalListener("node", getNodeId);

            view.addSignalListener('scalepos', function (evt, val) {
                console.log('scalepos: ' + val, evt);
                currentTime = val;

            });

            view.addSignalListener('xField', updateRange);

            view.addSignalListener('annotationSig', function (evt, val) {
                console.log('annotationSig: ' + val.id);

                if (val.id !== undefined) {

                    if (text !== undefined)
                        text.remove();

                    if (button !== undefined)
                        button.remove();

                    if (buttonCancel !== undefined)
                        buttonCancel.remove();

                    const divEle = document.getElementById("vis");

                    text = document.createElement("textarea");
                    var t = document.createTextNode(val.annotation);
                    text.appendChild(t);

                    text.style.top = `${val.y}px`;
                    text.style.left = `${val.y}px`;


                    button = document.createElement('button');
                    button.innerHTML = 'Save';
                    button.onclick = function () {

                        $.ajax({
                            type: "POST",
                            url: 'http://127.0.0.1:5500/modifyannotation',
                            contentType: "application/json",
                            dataType: 'json',
                            data: JSON.stringify({
                                id: val.id,
                                annotation: text.value,
                            }),
                            success: function (data) {
                                console.log("modifyannotation ajax success", data)
                            },
                            error: function (err) {
                                console.log("modifyannotation ajax fail", err)
                            }
                        }).done(function (o) {
                            // do something
                            console.log("modifyannotation ajax done", o);
                        });

                        if (text !== undefined)
                            text.remove();

                        if (button !== undefined)
                            button.remove();

                        if (buttonCancel !== undefined)
                            buttonCancel.remove();


                    };

                    button.style.top = `${val.y + 110}px`;
                    button.style.left = `${val.y}px`;

                    buttonCancel = document.createElement('button');
                    buttonCancel.innerHTML = 'Cancel';
                    buttonCancel.onclick = function () {
                        if (text !== undefined)
                            text.remove();

                        if (button !== undefined)
                            button.remove();

                        if (buttonCancel !== undefined)
                            buttonCancel.remove();
                    };

                    buttonCancel.style.top = `${val.y + 110}px`;
                    buttonCancel.style.left = `${val.y + 95}px`;


                    divEle.appendChild(text);
                    divEle.appendChild(button);
                    divEle.appendChild(buttonCancel);

                }


            });

        });

};


const normalizePozition = (mouseX, mouseY) => {
    // ? compute what is the mouse position relative to the container element (scope)
    let {
        left: scopeOffsetX,
        top: scopeOffsetY,
    } = scope.getBoundingClientRect();

    scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
    scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

    const scopeX = mouseX - scopeOffsetX;
    const scopeY = mouseY - scopeOffsetY;

    // ? check if the element will go out of bounds
    const outOfBoundsOnX =
        scopeX + contextMenu.clientWidth > scope.clientWidth;

    const outOfBoundsOnY =
        scopeY + contextMenu.clientHeight > scope.clientHeight;

    let normalizedX = mouseX;
    let normalizedY = mouseY;

    // ? normalize on X
    if (outOfBoundsOnX) {
        normalizedX =
            scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
    }

    // ? normalize on Y
    if (outOfBoundsOnY) {
        normalizedY =
            scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
    }

    return { normalizedX, normalizedY };
};

scope.addEventListener("contextmenu", (event) => {
    console.log("contextmenu");

    if (event.target.id != "rc-canvas") {

        console.log("contextmenu 1");
        event.preventDefault();

        const { clientX: mouseX, clientY: mouseY } = event;

        const { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY);

        contextMenu.classList.remove("visible");

        console.log("contextmenu 2", mouseX, mouseY, normalizedX, normalizedY);

        contextMenu.style.top = `${normalizedY}px`;
        contextMenu.style.left = `${normalizedX}px`;

        setTimeout(() => {
            contextMenu.classList.add("visible");
        });
    }

});

scope.addEventListener("click", (e) => {
    // ? close the menu if the user clicks outside of it
    if (e.target.offsetParent != contextMenu) {
        contextMenu.classList.remove("visible");
    }
    else {
        if (e.target.id == "annotate") {
            annotationTime = currentTime;
            function addAnnotation(text, button, x, y) {
                console.log("addAnnotation", text.value);

                $.ajax({
                    type: "POST",
                    url: 'http://127.0.0.1:5500/addannotation',
                    contentType: "application/json",
                    dataType: 'json',
                    data: JSON.stringify({
                        annotation: text.value,
                        time: annotationTime,
                        y: y
                    }),
                    success: function (data) {
                        console.log("addAnnotation ajax success", data)
                    },
                    error: function (err) {
                        console.log("addAnnotation ajax fail", err)
                    }
                }).done(function (o) {
                    // do something
                    console.log("addAnnotation ajax done", o);
                });


                text.remove();
                button.remove();
            }

            if (text !== undefined)
                text.remove();

            if (button !== undefined)
                button.remove();

            if (buttonCancel !== undefined)
                buttonCancel.remove();

            const { clientX: mouseX, clientY: mouseY } = e;

            const { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY);

            contextMenu.classList.remove("visible");

            const divEle = document.getElementById("vis");

            text = document.createElement("textarea");
            var t = document.createTextNode("Enter comment here");
            text.appendChild(t);

            text.style.top = `${normalizedY}px`;
            text.style.left = `${normalizedX}px`;


            button = document.createElement('button');
            button.innerHTML = 'Submit';
            button.onclick = function () { addAnnotation(text, button, normalizedX, normalizedY) };

            button.style.top = `${normalizedY + 110}px`;
            button.style.left = `${normalizedX - 5}px`;

            buttonCancel = document.createElement('button');
            buttonCancel.innerHTML = 'Cancel';
            buttonCancel.onclick = function () {
                if (text !== undefined)
                    text.remove();

                if (button !== undefined)
                    button.remove();

                if (buttonCancel !== undefined)
                    buttonCancel.remove();
            };

            buttonCancel.style.top = `${normalizedY + 110}px`;
            buttonCancel.style.left = `${normalizedX + 105}px`;


            divEle.appendChild(text);
            divEle.appendChild(button);
            divEle.appendChild(buttonCancel);


        }

        console.log("CLICK EVENT", e.target.id);
    }
});