

import { Pane } from "./tweakpane-4.0.3.min.js"
import * as TweakpaneEssentialsPlugin from "./plugin-essentials/dist/tweakpane-plugin-essentials.js";
import * as TweakpaneFileInputPlugin from "./tweakpane-plugin-file-import/dist/tweakpane-plugin-file-import.js";
import * as treeModel from "./TreeModel-min.js"

import * as RC from "./RenderCore.js";
import {initVega} from "./vega.js"

export let pane;
export let PARAMS;
// GUI attributes
export let GUIActive = false;
export let lineStrip;
export let splineCluster = [];
export let splineCluster3;
export let splineCluster4;
export let limitT = 0.0;
export let animationDuration = 0.1;
export let max_T = 13;
export let min_T = 10;
export let max_E = 2;
export let min_E = 0;
export let limitT_Max = max_T;
export let limitT_Min = min_T;
export let limitE_Max = max_E;
export let limitE_Min = min_E;
export let animate = false;
export let colors = true;
export let animationSpeed = 50;
export let levels = 0;
//export let transparent = false
export let opacity = 1.0;
export let scale = 12;
export let trackWidth = 0.08;
export let masked = false;
export let colorTex;
export let finalColorTex;
export let samplePerTrack = 100;

export let fpsGraph;

export let timeFolder;
export let energyIntervalBiding;
export let intervalBiding;

export let timeAnimate = false;
export let patternCount = 0;
export let timeAnimationCount = 0;

export let limitT_Min_Animation = min_T;
export let limitT_Max_Animation = max_T;

export let count = 0;

export let tree = new TreeModel();
export let root = null;

export let byPDG;
export let bySubTree;
export let rqt = null;

export let light_ambient = true;
export let light_diffuse = true;
export let light_specular = true;
export let ambientOcc = true;

export let animation = false;
export let energyCrop = max_E;
export let gap = 1;
export let fill = 2;

export function initGUI() {
    console.log("GUI Initialized!");

    var viewer = document.getElementById("EveViewer9");

    // Log to console for debugging
    console.log("EveViewer9", viewer);
    
    
    if(pane != null)
        pane.dispose();

    pane = new Pane();
    pane.registerPlugin(TweakpaneFileInputPlugin);
    pane.registerPlugin(TweakpaneEssentialsPlugin);

    pane.element.style.width = "300px";
    pane.element.style.position = "fixed";
    pane.element.style.right = "3px";
    pane.element.style.top = "70px";
    pane.element.style.overflow = "visible";  // Allow overflow so buttons are visible




    document.getElementById("EveViewer9").appendChild(pane.element);

    pane.on('change', (ev) => {
        GUIActive = true;
    });

     PARAMS = {
        energyInterval: { min:  min_E, max:  max_E },
        interval: { min:  min_T, max:  max_T },
        animation: false,
        timeAnimation: false,
        timeAnimationInterval: { min:  min_T, max:  max_T },
        gap: 1,
        fill: 2,
        speed: 50,
        level: 0,
        byLevel: false,
        bySubTree: false,
        byPDG: false,
        colors: true,
        light_ambient: true,
        light_diffuse: true,
        light_specular: true,
        ambientOcc: true,
        //transparent: false,
        opacity: 1.0,
        subTree: 1,
        pdg: 0,
        outline: false,
        outlineWidth: 1.0,
        trackWidth:  trackWidth,
        timeCrop:  max_T,
        energyCrop:  max_E,
        masked: false,
        cluster0: true,
        cluster1: true,
        cluster2: true,
        cluster3: true,
        cluster4: true,
        

        energyIntervalCluster0: { min:  0.0,  max: 0.01 },
        energyIntervalCluster1: { min:  0.01, max: 0.03 },
        energyIntervalCluster2: { min:  0.03, max: 0.05 },
        energyIntervalCluster3: { min:  0.05, max: 0.1 },
        energyIntervalCluster4: { min:  0.1,  max: max_E },

        clusterColor0: {r: 0.835, g: 0.243, b: 0.310},   // Strong red-pink
        clusterColor1: {r: 0.992, g: 0.705, b: 0.384},   // Vivid orange
        clusterColor2: {r: 0.580, g: 0.823, b: 0.310},   // Bright green
        clusterColor3: {r: 0.129, g: 0.588, b: 0.953},   // Sky blue
        clusterColor4: {r: 0.596, g: 0.388, b: 0.710},   // Purple

        radius: 3,
        sigma: 1,
    };

    const performanceFolder = pane.addFolder({
        title: 'Performance Settings',
        expanded: false,
        hidden: false,
    });

    // FPS graph
     fpsGraph = performanceFolder.addBlade({
        view: 'fpsgraph',
        label: 'FPS',
        rows: 4,
        min: 30,
        max: 130,
    });

    const filteringFolder = pane.addFolder({
        title: 'Filtering Settings',
        expanded: false,
        hidden: false,
    });


    const lightingFolder = pane.addFolder({
        title: 'Lighting Settings',
        expanded: false,
        hidden: false,
    });

    const IORFolder = pane.addFolder({
        title: 'IOR Settings',
        expanded: false,
        hidden: false,
    });

    IORFolder.addBinding( PARAMS, 'masked',
        { label: 'IOR' })
        .on('change', (ev) => {
            masksFolder.hidden = !masksFolder.hidden;
             masked = ev.value;
            if ( masked) {
                 window.dispatchEvent(new CustomEvent("IOR", { detail: "IOR" }));
            }
            else {
                 window.dispatchEvent(new CustomEvent("NormalRender", { detail: "NormalRender" }));
            }    
        });

        const masksFolder = IORFolder.addFolder({
            title: 'IOR Settings',
            expanded: true,
            hidden: true,
        });

        masksFolder.addBinding( PARAMS, 'cluster0',
        { label: 'cluster0' })
        .on('change', (ev) => {
            cluster0Folder.hidden = !cluster0Folder.hidden;
            window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

            if( PARAMS.bySubTree &&  PARAMS.byPDG)
                 getSubTreeAtNode( PARAMS.subTree, true,  PARAMS.pdg);
            else if( PARAMS.bySubTree)
                 getSubTreeAtNode( PARAMS.subTree);
            else if( PARAMS.byPDG)
                 getSubTreeAtNode(1, true,  PARAMS.pdg);
            else
                 getSubTreeAtNode(1);   
        });

        masksFolder.addBinding( PARAMS, 'cluster1',
        { label: 'cluster1' })
        .on('change', (ev) => {
            cluster1Folder.hidden = !cluster1Folder.hidden;
            window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

            if( PARAMS.bySubTree &&  PARAMS.byPDG)
                 getSubTreeAtNode( PARAMS.subTree, true,  PARAMS.pdg);
            else if( PARAMS.bySubTree)
                 getSubTreeAtNode( PARAMS.subTree);
            else if( PARAMS.byPDG)
                 getSubTreeAtNode(1, true,  PARAMS.pdg);
            else
                 getSubTreeAtNode(1);    
        });

        masksFolder.addBinding( PARAMS, 'cluster2',
        { label: 'cluster2' })
        .on('change', (ev) => {
            cluster2Folder.hidden = !cluster2Folder.hidden;
            window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

            if( PARAMS.bySubTree &&  PARAMS.byPDG)
                 getSubTreeAtNode( PARAMS.subTree, true,  PARAMS.pdg);
            else if( PARAMS.bySubTree)
                 getSubTreeAtNode( PARAMS.subTree);
            else if( PARAMS.byPDG)
                 getSubTreeAtNode(1, true,  PARAMS.pdg);
            else
                 getSubTreeAtNode(1);    
        });

        masksFolder.addBinding( PARAMS, 'cluster3',
        { label: 'cluster3' })
        .on('change', (ev) => {
            cluster3Folder.hidden = !cluster3Folder.hidden;
            window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

            if( PARAMS.bySubTree &&  PARAMS.byPDG)
                 getSubTreeAtNode( PARAMS.subTree, true,  PARAMS.pdg);
            else if( PARAMS.bySubTree)
                 getSubTreeAtNode( PARAMS.subTree);
            else if( PARAMS.byPDG)
                 getSubTreeAtNode(1, true,  PARAMS.pdg);
            else
                 getSubTreeAtNode(1);   
        });

        masksFolder.addBinding( PARAMS, 'cluster4',
        { label: 'cluster4' })
        .on('change', (ev) => {
            cluster4Folder.hidden = !cluster4Folder.hidden;
            window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

            if( PARAMS.bySubTree &&  PARAMS.byPDG)
                 getSubTreeAtNode( PARAMS.subTree, true,  PARAMS.pdg);
            else if( PARAMS.bySubTree)
                 getSubTreeAtNode( PARAMS.subTree);
            else if( PARAMS.byPDG)
                 getSubTreeAtNode(1, true,  PARAMS.pdg);
            else
                 getSubTreeAtNode(1);   
        });
/*
        masksFolder.addBlade({
            view: 'list',
            label: 'Masks',
            options: [
              {text: 'low', value: 'mask_low'},
              {text: 'medium', value: 'mask_medium'},
              {text: 'high', value: 'mask_high'},
              {text: 'scene', value: 'scene'},
            ],
            value: 'scene',
          }).on('change', (ev) => {

              if (ev.value == 'mask_low') {
                  
                   finalColorTex = "imp2_blur";
              }
              else if (ev.value == 'mask_medium') {
                  
                   finalColorTex = "imp1_blur"
              }
          else if (ev.value == 'mask_high') {
                 
                   finalColorTex = "imp0_blur";
              }
              else
                   finalColorTex = "showerColor";


        });

*/



    const cluster0Folder = masksFolder.addFolder({
        title: 'Cluster0 Settings',
        expanded: false,
        hidden: false,
    });
    const cluster1Folder = masksFolder.addFolder({
        title: 'Cluster1 Settings',
        expanded: false,
        hidden: false,
    });
    const cluster2Folder = masksFolder.addFolder({
        title: 'Cluster2 Settings',
        expanded: false,
        hidden: false,
    });
    const cluster3Folder = masksFolder.addFolder({
        title: 'Cluster3 Settings',
        expanded: false,
        hidden: false,
    });
    const cluster4Folder = masksFolder.addFolder({
        title: 'Cluster4 Settings',
        expanded: false,
        hidden: false,
    });

    cluster0Folder.addBinding( PARAMS, 'energyIntervalCluster0', {
            min: -1.0,
            max:  max_E + 1,
            step: 0.0001,
            label: 'Cluster0'
        }).on('change', (ev) => {

             window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

            if( PARAMS.bySubTree &&  PARAMS.byPDG)
                 getSubTreeAtNode( PARAMS.subTree, true,  PARAMS.pdg);
            else if( PARAMS.bySubTree)
                 getSubTreeAtNode( PARAMS.subTree);
            else if( PARAMS.byPDG)
                 getSubTreeAtNode(1, true,  PARAMS.pdg);
            else
                 getSubTreeAtNode(1);
                 
        });

        cluster0Folder.addBinding(PARAMS, 'clusterColor0', {
            color: {type: 'float'},
          }).on('change', (ev) => {

            window.dispatchEvent(new CustomEvent("clusterColor", { detail: [0, ev.value] }));
            
          });

          cluster1Folder.addBinding( PARAMS, 'energyIntervalCluster1', {
            min: -1.0,
            max:  max_E + 1,
            step: 0.0001,
            label: 'Cluster1'
        }).on('change', (ev) => {

             window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

            if( PARAMS.bySubTree &&  PARAMS.byPDG)
                 getSubTreeAtNode( PARAMS.subTree, true,  PARAMS.pdg);
            else if( PARAMS.bySubTree)
                 getSubTreeAtNode( PARAMS.subTree);
            else if( PARAMS.byPDG)
                 getSubTreeAtNode(1, true,  PARAMS.pdg);
            else
                 getSubTreeAtNode(1);
                 
        });
        cluster1Folder.addBinding(PARAMS, 'clusterColor1', {
            color: {type: 'float'},
          }).on('change', (ev) => {

            window.dispatchEvent(new CustomEvent("clusterColor", { detail: [1, ev.value] }));
            
          });

          cluster2Folder.addBinding( PARAMS, 'energyIntervalCluster2', {
            min: -1.0,
            max:  max_E + 1,
            step: 0.0001,
            label: 'Cluster2'
        }).on('change', (ev) => {

             window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

            if( PARAMS.bySubTree &&  PARAMS.byPDG)
                 getSubTreeAtNode( PARAMS.subTree, true,  PARAMS.pdg);
            else if( PARAMS.bySubTree)
                 getSubTreeAtNode( PARAMS.subTree);
            else if( PARAMS.byPDG)
                 getSubTreeAtNode(1, true,  PARAMS.pdg);
            else
                 getSubTreeAtNode(1);
                 
        });

        cluster2Folder.addBinding(PARAMS, 'clusterColor2', {
            color: {type: 'float'},
          }).on('change', (ev) => {

            window.dispatchEvent(new CustomEvent("clusterColor", { detail: [2, ev.value] }));

          });

          cluster3Folder.addBinding( PARAMS, 'energyIntervalCluster3', {
            min: -1.0,
            max:  max_E + 1,
            step: 0.0001,
            label: 'Cluster3'
        }).on('change', (ev) => {

             window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

            if( PARAMS.bySubTree &&  PARAMS.byPDG)
                 getSubTreeAtNode( PARAMS.subTree, true,  PARAMS.pdg);
            else if( PARAMS.bySubTree)
                 getSubTreeAtNode( PARAMS.subTree);
            else if( PARAMS.byPDG)
                 getSubTreeAtNode(1, true,  PARAMS.pdg);
            else
                 getSubTreeAtNode(1);
                 
        });

        cluster3Folder.addBinding(PARAMS, 'clusterColor3', {
            color: {type: 'float'},
          }).on('change', (ev) => {

            window.dispatchEvent(new CustomEvent("clusterColor", { detail: [3, ev.value] }));

          });

          cluster4Folder.addBinding( PARAMS, 'energyIntervalCluster4', {
            min: -1.0,
            max:  max_E + 1,
            step: 0.0001,
            label: 'Cluster4'
        }).on('change', (ev) => {

             window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

            if( PARAMS.bySubTree &&  PARAMS.byPDG)
                 getSubTreeAtNode( PARAMS.subTree, true,  PARAMS.pdg);
            else if( PARAMS.bySubTree)
                 getSubTreeAtNode( PARAMS.subTree);
            else if( PARAMS.byPDG)
                 getSubTreeAtNode(1, true,  PARAMS.pdg);
            else
                 getSubTreeAtNode(1);
                 
        });

        cluster4Folder.addBinding(PARAMS, 'clusterColor4', {
            color: {type: 'float'},
          }).on('change', (ev) => {

            window.dispatchEvent(new CustomEvent("clusterColor", { detail: [4, ev.value] }));

          });

        masksFolder.addBinding( PARAMS, 'radius', {
            min: 1.0,
            max: 20,
            step: 1,
            label: 'Gaussian Kernel Radius'
        }).on('change', (ev) => {

            const [offset_gaussian, weight_gaussian] = gaussianKernel(ev.value,  PARAMS.sigma);

            window.dispatchEvent(new CustomEvent("gaussianChanged", { detail: [ev.value, offset_gaussian, weight_gaussian] }));
        });

        masksFolder.addBinding( PARAMS, 'sigma', {
            min: 0.1,
            max: 20,
            step: 0.1,
            label: 'Gaussian Kernel Sigma'
        }).on('change', (ev) => {
            const [offset_gaussian, weight_gaussian] = gaussianKernel( PARAMS.radius, ev.value);

            window.dispatchEvent(new CustomEvent("gaussianChanged", { detail: [PARAMS.radius, offset_gaussian, weight_gaussian] }));

        });

    lightingFolder.addBinding( PARAMS, 'light_ambient',
        { label: 'light_ambient' })
        .on('change', (ev) => {
            light_ambient = ev.value;
            window.dispatchEvent(new CustomEvent("valueChanged", { detail: ev.value }));
        });

    lightingFolder.addBinding( PARAMS, 'light_diffuse',
        { label: 'light_diffuse' })
        .on('change', (ev) => {
            light_diffuse = ev.value;
            window.dispatchEvent(new CustomEvent("valueChanged", { detail: ev.value }));
        });

    lightingFolder.addBinding( PARAMS, 'light_specular',
        { label: 'light_specular' })
        .on('change', (ev) => {
            light_specular = ev.value;
            window.dispatchEvent(new CustomEvent("valueChanged", { detail: ev.value }));
        });

    lightingFolder.addBinding( PARAMS, 'ambientOcc',
        { label: 'ambientOcc' })
        .on('change', (ev) => {
            ambientOcc = ev.value;
            window.dispatchEvent(new CustomEvent("valueChanged", { detail: ev.value }));
        });



    const animationFolder = pane.addFolder({
        title: 'Animation Settings',
        expanded: false,
        hidden: false,
    });


    animationFolder.addBinding( PARAMS, 'animation',
        {
            label: 'Dashed-line Animation',
        }).on('change', (ev) => {
            animationSubFolder.hidden = !animationSubFolder.hidden;
             animate = ev.value;
             animation = ev.value;
             window.dispatchEvent(new CustomEvent("valueChanged", { detail: animate }));
        });

    animationFolder.addBinding( PARAMS, 'timeAnimation',
        {
            label: 'Time Animation',
        }).on('change', (ev) => {
            timeAnimationSubFolder.hidden = !timeAnimationSubFolder.hidden;
             timeAnimate = ev.value;
             window.dispatchEvent(new CustomEvent("valueChanged", { detail: timeAnimate }));
        });

    const animationSubFolder = animationFolder.addFolder({
        title: 'Dashed-line Animation Settings',
        expanded: true,
        hidden: true,
    });

    const timeAnimationSubFolder = animationFolder.addFolder({
        title: 'Time Animation Settings',
        expanded: true,
        hidden: true,
    });

    timeAnimationSubFolder.addBinding( PARAMS, 'timeAnimationInterval', {
        min:  min_T,
        max:  max_T,
        step: 0.001,
        label: 'Time Animation Interval'
    }).on('change', (ev) => {
         limitT_Min_Animation = ev.value.min;
         limitT_Max_Animation = ev.value.max;
         window.dispatchEvent(new CustomEvent("valueChanged", { detail: limitT_Min_Animation }));
    });

    animationSubFolder.addBinding( PARAMS, 'gap',
        { label: 'Gap Size', min: 1, max: 5, step: 1 })
        .on('change', (ev) => {
            gap = ev.value;
            window.dispatchEvent(new CustomEvent("valueChanged", { detail: ev.value }));
        });
    animationSubFolder.addBinding( PARAMS, 'fill',
        { label: 'Segment Size', min: 1, max: 5, step: 1 })
        .on('change', (ev) => {
            fill = ev.value;
            window.dispatchEvent(new CustomEvent("valueChanged", { detail: ev.value }));
        });
    animationSubFolder.addBinding( PARAMS, 'speed',
        { label: 'Speed', min: 1, max: 99, step: 1, row: 6 })
        .on('change', (ev) => {
             animationSpeed = 101 - ev.value;

        });

/*
    const debuggingFolder = pane.addFolder({
        title: 'Debugging Settings',
        expanded: false,
        hidden: false,
    });

    debuggingFolder.addBinding( PARAMS, 'colors',
        {
            label: 'Colors',
        }).on('change', (ev) => {
             colors = ev.value;
            if (!ev.value) {
                
                 lineStrip.setColors( colors);
                 splineCluster[2].setColors( colors);
                 splineCluster[1].setColors( colors);
                 splineCluster[0].setColors( colors);


            }
        });
*/
    filteringFolder.addBinding( PARAMS, 'byPDG',
        {
            label: 'Display By pdg id',
        }).on('change', (ev) => {
            pdgFolder.hidden = !pdgFolder.hidden;
             byPDG = ev.value;

            if (!ev.value) {

                
                window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

                if( PARAMS.bySubTree)
                     getSubTreeAtNode( PARAMS.subTree);
                else 
                     getSubTreeAtNode(1);
                

                 PARAMS.interval.min =  min_T;
                 PARAMS.interval.max =  max_T;
                 PARAMS.gap = 1;
                 PARAMS.fill = 2;
                 PARAMS.speed = 50;
                 limitT_Min =  PARAMS.interval.min;
                 limitT_Max =  PARAMS.interval.max;

                 timeFolder.remove( intervalBiding);


                 intervalBiding =  timeFolder.addBinding( PARAMS, 'interval', {
                    min:  min_T,
                    max:  max_T,
                    step: 0.001,
                    label: 'Time Interval'
                }).on('change', (ev) => {
                     limitT_Min = ev.value.min;
                     limitT_Max = ev.value.max;
                });
            }

        });


    const pdgFolder = filteringFolder.addFolder({
        title: 'pdg Settings',
        expanded: true,
        hidden: true,
    });

    pdgFolder.addBinding( PARAMS, 'pdg', {
        min: -1000000000,
        max: 1000000000,
        step: 1,
    }).on('change', (ev) => {
        
        window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

        if( PARAMS.bySubTree)
             getSubTreeAtNode( PARAMS.subTree, true, ev.value);
        else 
             getSubTreeAtNode(1, true, ev.value);


         PARAMS.interval.min =  min_T;
         PARAMS.interval.max =  max_T;
         PARAMS.byLevel = false;

         timeFolder.remove( intervalBiding);

         intervalBiding =  timeFolder.addBinding( PARAMS, 'interval', {
            min:  PARAMS.interval.min,
            max:  PARAMS.interval.max,
            step: 0.001,
            label: 'Time Interval'
        }).on('change', (ev) => {
             limitT_Min = ev.value.min;
             limitT_Max = ev.value.max;
        });

        pane.refresh();

    });

    
    filteringFolder.addBinding( PARAMS, 'bySubTree',
    {
        label: 'Display By SubTree',
    }).on('change', (ev) => {
        subTreeFolder.hidden = !subTreeFolder.hidden;
         bySubTree = ev.value;

        if (!ev.value) {

            
            window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

            if( PARAMS.byPDG)
                 getSubTreeAtNode(1, true,  PARAMS.pdg);
            else
                 getSubTreeAtNode(1);

             PARAMS.interval.min =  min_T;
             PARAMS.interval.max =  max_T;
             PARAMS.gap = 1;
             PARAMS.fill = 2;
             PARAMS.speed = 50;
             limitT_Min =  PARAMS.interval.min;
             limitT_Max =  PARAMS.interval.max;

             timeFolder.remove( intervalBiding);


             intervalBiding =  timeFolder.addBinding( PARAMS, 'interval', {
                min:  min_T,
                max:  max_T,
                step: 0.001,
                label: 'Time Interval'
            }).on('change', (ev) => {
                 limitT_Min = ev.value.min;
                 limitT_Max = ev.value.max;
            });
        }

    });


const subTreeFolder = filteringFolder.addFolder({
    title: 'SubTree Settings',
    expanded: true,
    hidden: true,
});

const energyFolder = filteringFolder.addFolder({
    title: 'Energy Settings',
    expanded: true,
    hidden: false,
});

 timeFolder = filteringFolder.addFolder({
    title: 'Time Settings',
    expanded: true,
    hidden: false,
});

subTreeFolder.addBinding( PARAMS, 'subTree', {
    min: 1,
    max: 12507,
    step: 1,
}).on('change', (ev) => {
    
    window.dispatchEvent(new CustomEvent("deleteSplines", { detail: ev }));

    if( PARAMS.byPDG)
         getSubTreeAtNode(ev.value, true,  PARAMS.pdg);
    else
         getSubTreeAtNode(ev.value);

     PARAMS.interval.min =  min_T;
     PARAMS.interval.max =  max_T;
     PARAMS.byLevel = false;

     timeFolder.remove( intervalBiding);

     intervalBiding =  timeFolder.addBinding( PARAMS, 'interval', {
        min:  PARAMS.interval.min,
        max:  PARAMS.interval.max,
        step: 0.001,
        label: 'Time Interval'
    }).on('change', (ev) => {
         limitT_Min = ev.value.min;
         limitT_Max = ev.value.max;
    });

    pane.refresh();

});

energyFolder.addBinding( PARAMS, 'energyCrop', {
    min:  min_E,
    max:  max_E,
    step: 0.001,
    label: 'Energy Max Crop'
}).on('change', (ev) => {
    energyCrop = ev.value;
    energyFolder.remove( energyIntervalBiding);

     energyIntervalBiding = energyFolder.addBinding( PARAMS, 'energyInterval', {
        min:  min_E,
        max: ev.value,
        step: 0.001,
        label: 'Energy Interval'
    }).on('change', (ev) => {
         limitE_Min = ev.value.min;
         limitE_Max = ev.value.max;
         window.dispatchEvent(new CustomEvent("valueChanged", { detail: ev.value }));
    });
    pane.refresh();
});

// Interval
 energyIntervalBiding = energyFolder.addBinding( PARAMS, 'energyInterval', {
    min: 0,
    max:  max_E,
    step: 0.001,
    label: 'Energy Interval'
}).on('change', (ev) => {
     limitE_Min = ev.value.min;
     limitE_Max = ev.value.max;
     window.dispatchEvent(new CustomEvent("valueChanged", { detail: ev.value }));
});

// Interval
 timeFolder.addBinding( PARAMS, 'timeCrop', {
    min:  min_T,
    max:  max_T,
    step: 0.001,
    label: 'Time Max Crop'
}).on('change', (ev) => {
    
     timeFolder.remove( intervalBiding);

     intervalBiding =  timeFolder.addBinding( PARAMS, 'interval', {
        min:  PARAMS.interval.min,
        max: ev.value,
        step: 0.001,
        label: 'Time Interval'
    }).on('change', (ev) => {
         limitT_Min = ev.value.min;
         limitT_Max = ev.value.max;
         window.dispatchEvent(new CustomEvent("valueChanged", { detail: ev.value }));
    });
    
    pane.refresh();
});

// Interval
 intervalBiding =  timeFolder.addBinding( PARAMS, 'interval', {
    min:  min_T,
    max:  max_T,
    step: 0.001,
    label: 'Time Interval'
}).on('change', (ev) => {
     limitT_Min = ev.value.min;
     limitT_Max = ev.value.max;
     window.dispatchEvent(new CustomEvent("valueChanged", { detail: ev.value }));
});

pane.addBinding( PARAMS, 'trackWidth',
    { label: 'Tracks Width', min: 0, max: 1.0, step: 0.00001 })
    .on('change', (ev) => {
         trackWidth = ev.value;
         window.dispatchEvent(new CustomEvent("valueChanged", { detail: trackWidth }));

    });

    const queryBuilderFolder = filteringFolder.addFolder({
        title: 'Custom Filter Builder',
        expanded: true,
    });
    
    const queryState = {
        rules: [],
    };
    
    const fields = {
        energy: 'energy',
        time: 'time',
        pdg: 'pdg',
    };
    
    const operators = {
        equals: 'equals',
        'greater than': 'greater than',
        'less than': 'less than',
    };
    
    function addRule() {
        const rule = {
            field: 'energy',
            operator: 'equals',
            value: '',
        };
    
        queryState.rules.push(rule);
    
        const ruleFolder = queryBuilderFolder.addFolder({
            title: `Rule ${queryState.rules.length}`,
            expanded: true,
        });
    
        ruleFolder.addBinding(rule, 'field', {
            options: fields,
            label: 'Field',
        });
    
        ruleFolder.addBinding(rule, 'operator', {
            options: operators,
            label: 'Operator',
        });
    
        ruleFolder.addBinding(rule, 'value', {
            label: 'Value',
        });
    
        ruleFolder.addButton({ label: 'Remove', title: 'Remove' }).on('click', () => {
            queryBuilderFolder.remove(ruleFolder);
            const idx = queryState.rules.indexOf(rule);
            if (idx > -1) queryState.rules.splice(idx, 1);
        });

        // Ensure buttons inside the pane are visible
        const buttons = document.getElementsByClassName("tp-btnv_b"); // class="tp-btnv_b"
        Array.from(buttons).forEach(button => {

            button.style.opacity = '1';  // Set the opacity to 1 for full visibility (previously 0)
            button.style.position = 'relative';  // Fixed position for the container

        });
    }
    
    
    // Add initial rule
    addRule();
    
    // ✅ THESE BUTTONS SHOULD BE VISIBLE
    queryBuilderFolder.addButton({ title: 'Add Rule' }).on('click', () => addRule());
    
    queryBuilderFolder.addButton({ title: '📄 Show Filter JSON' }).on('click', () => {
        const result = {
            condition: 'AND',
            rules: queryState.rules.map(r => ({
                field: r.field,
                operator: r.operator,
                value: r.value,
            })),
        };
        console.log(result);
        alert(JSON.stringify(result, null, 2));
    });
    

    // Ensure buttons inside the pane are visible
    const buttons = document.getElementsByClassName("tp-btnv_b"); // class="tp-btnv_b"
    Array.from(buttons).forEach(button => {

        button.style.opacity = '1';  // Set the opacity to 1 for full visibility (previously 0)
        button.style.position = 'relative';  // Fixed position for the container

    });

};

function iterateSceneR(object, callback) {
    if (object === null || object === undefined) {
        return;
    }

    if (object.children.length > 0) {
        for (let i = 0; i < object.children.length; i++) {
            iterateSceneR(object.children[i], callback);
        }
    }

    callback(object);
}

export function setSplinesUniform(rqt)
{

    //console.log("scene test", rqt);

    iterateSceneR(rqt.scene, function(object){
        if (object instanceof RC.ZSplines ){
            object.setTimeLimitMin(limitT_Min);
            object.setTimeLimitMax(limitT_Max);
            object.setEnergyLimitMin(limitE_Min);
            object.setEnergyLimitMax(limitE_Max);
            object.setTEnergyMax(energyCrop);
            object.setGapSize(gap);
            object.setFillSize(fill);
            object.setWidth(trackWidth);
            
            if(!animation)
                object.setAnimationPattern(0.0);
        }
    });

    
    rqt.RP_Splines_Lighting_mat.setUniform("light_ambient", light_ambient);
    rqt.RP_Splines_Lighting_mat.setUniform("light_diffuse", light_diffuse);
    rqt.RP_Splines_Lighting_mat.setUniform("light_specular", light_specular);
    rqt.RP_Splines_Lighting_mat.setUniform("ambientOcc", ambientOcc);

    if(timeAnimate)
    {
        if(count % (1) == 0)
            {
                timeAnimationCount = 0.01;
                limitT_Min_Animation = limitT_Min_Animation + timeAnimationCount;
                limitT_Max_Animation = limitT_Max_Animation + timeAnimationCount;

                if(limitT_Max_Animation > max_T)
                    {
                        limitT_Max_Animation = min_T + (limitT_Max_Animation - limitT_Min_Animation);
                        limitT_Min_Animation = min_T;
                    }
            }
        

        iterateSceneR(rqt.scene, function (object) {
            if (object instanceof RC.ZSplines) {
                object.setTimeLimitMin(limitT_Min_Animation);
                object.setTimeLimitMax(limitT_Max_Animation);

            }
        });
    }

    if (count % (animationSpeed) == 0 && animate) {
        patternCount = patternCount + 0.001;

        //console.log("patternCount", patternCount);

        iterateSceneR(rqt.scene, function (object) {
            if (object instanceof RC.ZSplines) {
                object.setAnimationPattern(patternCount)

            }
        });
    }

    count++;

}


function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function loadVega() {
    try {
        console.log("Loading Vega...");
        await loadScript("https://cdn.jsdelivr.net/npm/vega@5.28.0");
        console.log("Vega loaded ✅");

        console.log("Loading Vega-Lite...");
        await loadScript("https://cdn.jsdelivr.net/npm/vega-lite@5.18.1");
        console.log("Vega-Lite loaded ✅");

        console.log("Loading Vega-Embed...");
        await loadScript("https://cdn.jsdelivr.net/npm/vega-embed@6.25.0");
        console.log("Vega-Embed loaded ✅");

        console.log("All scripts loaded. Now you can use Vega!");

        initVega();
    } catch (error) {
        console.error("❌ Failed to load scripts:", error);
    }
}

export function setSchematicView() {
    // Create global styles dynamically
    console.log("✅ setupEventHandlers() is running...");

    

    const style = document.createElement("style");
    style.innerHTML = `
    #context-menu {
        position: fixed;
        z-index: 10000;
        width: 150px;
        background: #1b1a1a;
        border-radius: 5px;
        transform: scale(0);
        transform-origin: top left;
      }

      #context-menu.visible {
        transform: scale(1);
        transition: transform 200ms ease-in-out;
      }

      #context-menu .item {
        padding: 8px 10px;
        font-size: 12px;
        color: #ffffff;
        cursor: pointer;
        border-radius: inherit;
      }

      #context-menu .item:hover {
        background: #343434;
      }

      textarea {
        width: 20%;
        height: 100px;
        position: fixed;
        padding: 12px 20px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;
      }

      input[type="range"] {
        width: 130px;
      }

      select {
        margin: 8px;
      }

      label {
        font-family: "Open Sans", sans-serif;
        margin: 3px;
        font-size: 12px;
        font-weight: bold;
      }

      button {
        background-color: #04AA6D; 
        position: fixed;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
      }
      button:hover { background-color: #3e8e41 }
      button:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
      }

      div.fixed {
        position: fixed;
        overflow: auto;
        bottom: 1;
        right: 1;
        width: 350px;
        height: 400px;
        border: 3px solid #000000;
        background-color: #ffffff;
      }

      #widnow {
        position: fixed;
        top: 70px;
        width: 350px;
        height: 400px;
      }

      #title_bar {
        background: #363636;
        border: 3px solid #363636;
        opacity: 0.8;
        height: 25px;
        width: 100%;
        color: white;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
      }

      #button {
        position: relative;
        bottom: 0;
        right: 0;
        width: 25px;
        height: 25px;
        float: right;
        cursor: pointer;
        background-color: #363636;
        color: white;
        opacity: 1.0;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
      }

      #button:hover { background-color: #445245 }

      #vis {
        position: fixed;
        bottom: 1;
        right: 1;
        width: 350px;
        height: 450px;
        border: 3px solid #000000;
        background-color: #ffffff;
      }

      .vega-actions a {
        margin-right: 50px;
      }

      /* Start Task Overlay Styling */
      #startTaskButton {
        position: fixed;
        bottom: 10px;
        left: 10px;
        z-index: 10001;
        padding: 12px 20px;
        font-size: 14px;
        background-color: #04AA6D;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
      }

      #startTaskButton:hover {
        background-color: #038a56;
      }

      #taskOverlay {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%, 0);
        background: white;
        padding: 20px;
        padding-bottom: 60px;
        border: 2px solid black;
        z-index: 10000;
        display: none;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        border-radius: 8px;
        width: 300px;
      }

      #taskOverlay p {
        margin: 0 0 15px 0;
        font-size: 16px;
        font-weight: bold;
      }

      .taskButtonContainer {
        text-align: center;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        margin-top: 15px;
      }

      #taskOverlay button {
        padding: 10px 20px;
        font-size: 14px;
        cursor: pointer;
        background-color: #04AA6D;
        color: white;
        border: none;
        border-radius: 5px;
        display: inline-block;
      }

      #taskOverlay button:hover {
        background-color: #038a56;
      }
    `;
    document.head.appendChild(style);

    //EveViewer9

    var viewer = document.getElementById("EveViewer9");

    // Log to console for debugging
    console.log("EveViewer9", viewer);

    // Create sidebar (2D View)
    const aside = document.createElement("aside");

    const windowDiv = document.createElement("div");
    windowDiv.id = "widnow";

    const contextMenu = document.createElement("div");
    contextMenu.id = "context-menu";

    const annotate = document.createElement("div");
    annotate.id = "annotate";
    annotate.classList.add("item");
    annotate.innerText = "Add Annotation";


    const cm = document.getElementById("widnow");

    console.log("cm", cm);

    const titleBar = document.createElement("div");
    titleBar.id = "title_bar";
    titleBar.innerText = "2D View";

    const minimizeButton = document.createElement("div");
    minimizeButton.id = "button";
    minimizeButton.innerText = "-";

    titleBar.appendChild(minimizeButton);
    windowDiv.appendChild(titleBar);

    const visDiv = document.createElement("div");
    visDiv.id = "vis";
    windowDiv.appendChild(visDiv);

    aside.appendChild(windowDiv);
    viewer.appendChild(windowDiv);

    contextMenu.appendChild(annotate);
    viewer.appendChild(contextMenu);

    loadVega();

    // Create task overlay UI
    const startTaskButton = document.createElement("button");
    startTaskButton.id = "startTaskButton";
    startTaskButton.innerText = "Start User Study";

    const taskOverlay = document.createElement("div");
    taskOverlay.id = "taskOverlay";

    const taskDescription = document.createElement("p");
    taskDescription.id = "taskDescription";
    taskDescription.innerText = "Click on High Energy Trajectories.";

    const taskButtonContainer = document.createElement("div");
    taskButtonContainer.className = "taskButtonContainer";

    const startButton = document.createElement("button");
    startButton.innerText = "Start Task";

    taskButtonContainer.appendChild(startButton);
    taskOverlay.appendChild(taskDescription);
    taskOverlay.appendChild(taskButtonContainer);

    viewer.appendChild(startTaskButton);
    viewer.appendChild(taskOverlay);

    // Task Overlay Logic
    let taskStartTime = null;
    let taskComplete = false;

    startTaskButton.addEventListener("click", function () {
        taskOverlay.style.display = "block";
    });

    startButton.addEventListener("click", function () {
        taskOverlay.style.display = "none";
        taskStartTime = performance.now();
        taskComplete = false;
        console.log("Task started!");

        setTimeout(() => {
            if (taskStartTime) completeTask();
        }, 5000);
    });

    function completeTask() {
        if (!taskStartTime || taskComplete) return;

        const taskEndTime = performance.now();
        const timeTaken = (taskEndTime - taskStartTime) / 1000;
        taskComplete = true;

        const accuracy = Math.random().toFixed(2);

        alert(`Task complete! Time: ${timeTaken.toFixed(2)} seconds\nAccuracy: ${accuracy}`);
    }

    // Toggle Window Visibility
    minimizeButton.addEventListener("click", function () {
        if (minimizeButton.innerText === "-") {
            minimizeButton.innerText = "+";
            visDiv.style.display = "none";
        } else {
            minimizeButton.innerText = "-";
            visDiv.style.display = "block";
        }
    });
};

// add a function to the dataflow to update pre with the hovered value
export function getNodeId(evt, val) {
    //d3.select("#pre-hovered").text(JSON.stringify(val));

    if (val != 0) {


        window.dispatchEvent(new CustomEvent("deleteSplines", { detail: "getNodeId" }));

        getSubTreeAtNode(val);

        
        PARAMS.interval.min = min_T;
        PARAMS.interval.max = max_T;

        PARAMS.bySubTree = true;
        PARAMS.subTree = val;

        PARAMS.byLevel = false;

        timeFolder.remove(intervalBiding);

        intervalBiding = timeFolder.addBinding(PARAMS, 'interval', {
            min: PARAMS.interval.min,
            max: PARAMS.interval.max,
            step: 0.001,
            label: 'Time Interval'
        }).on('change', (ev) => {
            limitT_Min = ev.value.min;
            limitT_Max = ev.value.max;
        });

        pane.refresh();


    }
};

function erf(x) {
    // constants
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var p  =  0.3275911;

    // Save the sign of x
    var sign = 1;
    if (x < 0) {
        sign = -1;
    }
    x = Math.abs(x);

    // A&S formula 7.1.26
    var t = 1.0/(1.0 + p*x);
    var y = 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-x*x);

    return sign*y;
}

function gaussianKernel(radius, sigma)
{
    //const radius = parseInt(radiusInput.value);
    //const sigma = parseFloat(sigmaInput.value);
    const linear = false;
    const correction = true;

    if (sigma == 0.0) return;

    var weights = [];
    let sumWeights = 0.0;
    for (let i = -radius; i <= radius; i++)
    {
        let w = 0;
        if (correction)
        {  
            w = (erf((i + 0.5) / sigma / Math.sqrt(2)) - erf((i - 0.5) / sigma / Math.sqrt(2))) / 2;
        }
        else
        {
            w = Math.exp(- i * i / sigma / sigma);
        }
        sumWeights += w;
        weights.push(w);
    }

    for (let i in weights)
        weights[i] /= sumWeights;

    var offsets = [];
    var newWeights = [];

    let hasZeros = false;

    if (linear)
    {
        for (let i = -radius; i <= radius; i += 2)
        {
            if (i == radius)
            {
                offsets.push(i);
                newWeights.push(weights[i + radius]);
            }
            else
            {
                const w0 = weights[i + radius + 0];
                const w1 = weights[i + radius + 1];

                const w = w0 + w1;
                if (w > 0)
                {
                    offsets.push(i + w1 / w);
                }
                else
                {
                    hasZeros = true;
                    offsets.push(i);
                }
                newWeights.push(w);
            }
        }
    }
    else
    {
        for (let i = -radius; i <= radius; i++)
        {
            offsets.push(i);
        }

        for (let w of weights)
            if (w == 0.0)
                hasZeros = true;

        newWeights = weights;
    }

    return [offsets.slice(radius,offsets.length), newWeights.slice(radius,offsets.length)];
/*
    if (hasZeros)
        warningDiv.innerHTML = "Some weights are equal to zero; try using a smaller radius or a bigger sigma";
    else
        warningDiv.innerHTML = "<br>";
*/

}

export function updateRange(evt, val) {

    //console.log('xField: ' + val);

    const rangeBeg = document.getElementsByName("xbegin");
    const rangeEnd = document.getElementsByName("xend");

    //console.log('xField: ' + val);
    if (val == "time") {
        rangeBeg[0].min = min_T - 1;
        rangeEnd[0].min = min_T - 1;;

        rangeBeg[0].max = max_T + 1;;
        rangeEnd[0].max = max_T + 1;;
    }
    else { //zvdndecrfvxsggcgrgcevndgfbm chlgm.m,nnmb.v, /gnm.nmn
        rangeBeg[0].min = 0;
        rangeEnd[0].min = 0;

        rangeBeg[0].max = 0;
        rangeEnd[0].max = 0;
    }

}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function recursiveTree(array) {
    function getChildren(parents, input) {
        return parents.map(parent => {
            const children = input.filter(x => x.parent === parent.id);
            parent.children = children;
            if (children.length === 0) {
                return parent;
            } else {
                parent.children = getChildren(children, input);
                return parent;
            }
        })
    }

    const roots = array.filter(x => x.parent == null);

    return getChildren(roots, array);
}

export function loadData() {

    window.dispatchEvent(new CustomEvent("deleteSplines", { detail: "loadData" }));


    // Load json file that contains time information [min/max] per level
    fetch('rootui5sys/eve7/lib/output-time.json')
        .then((response) => response.json())
        .then(data => {

            levels = data.levels;
            max_T = data.max;
            min_T = data.min;

            max_E = data.maxE + 1;
            min_E = data.minE;

        });
    

    fetch('rootui5sys/eve7/lib/output.json')
        .then((response) => response.json())
        .then(data => {
           

            // creating the tree data structure 
            var r = recursiveTree(data);
            //console.log("r[0]", r[0]);
            root = tree.parse(r[0]);

            limitT_Max = max_T;
            limitT_Min = min_T;

            limitE_Max = max_E;
            limitE_Min = min_E;

            initGUI();

            getSubTreeAtNode(1);

        });
}

function getSubTreeAtNode(id, pdgFilter = false, pdg = 0) {
        
    //console.log("testing pdg", )
    var node = root.first(function (node) {
        return node.model.id === id;
    });

    if (node != null) {
        let tracksData = [];
        let tracksTime = [];
        let trackEnergy = [];
        let trackColor = [];
        let trackImportance = [];

        let tracksData_masked = []; tracksData_masked[0] = []; tracksData_masked[1] = []; tracksData_masked[2] = []; tracksData_masked[3] = []; tracksData_masked[4] = [];
        let tracksTime_masked = []; tracksTime_masked[0] = []; tracksTime_masked[1] = []; tracksTime_masked[2] = []; tracksTime_masked[3] = []; tracksTime_masked[4] = [];
        let trackEnergy_masked = []; trackEnergy_masked[0] = []; trackEnergy_masked[1] = []; trackEnergy_masked[2] = []; trackEnergy_masked[3] = []; trackEnergy_masked[4] = [];
        let trackColor_masked = []; trackColor_masked[0] = []; trackColor_masked[1] = []; trackColor_masked[2] = []; trackColor_masked[3] = []; trackColor_masked[4] = [];
        let trackImportance_masked = []; trackImportance_masked[0] = []; trackImportance_masked[1] = []; trackImportance_masked[2] = []; trackImportance_masked[3] = []; trackImportance_masked[4] = [];

        
        window.dispatchEvent(new CustomEvent("deleteSplines", { detail: "getSubTreeAtNode" }));

        let testCount = 0;



        node.walk({ strategy: 'pre' }, function (node) {
            // Halt the traversal by returning false

            if ((!pdgFilter || (pdgFilter && pdg == node.model.pdg)))
                {
                testCount++;
                //console.log("node.model.level", node.model.level);

                tracksData.push(node.model.position_beg[0]);
                tracksData.push(node.model.position_beg[1]);
                tracksData.push(node.model.position_beg[2]);

                tracksData.push(node.model.tangent_beg[0]);
                tracksData.push(node.model.tangent_beg[1]);
                tracksData.push(node.model.tangent_beg[2]);

                tracksData.push(node.model.position_end[0]);
                tracksData.push(node.model.position_end[1]);
                tracksData.push(node.model.position_end[2]);

                tracksData.push(node.model.tangent_end[0]);
                tracksData.push(node.model.tangent_end[1]);
                tracksData.push(node.model.tangent_end[2]);

                tracksTime.push(node.model.time_beg);
                tracksTime.push(node.model.time_end);
                tracksTime.push(0.0);

                trackEnergy.push(node.model.energy_beg);
                trackEnergy.push(node.model.energy_end);
                trackEnergy.push(0.0);

                let importance = 5.0;

                if(PARAMS.cluster0 && node.model.energy_beg >= PARAMS.energyIntervalCluster0.min && node.model.energy_beg < (PARAMS.energyIntervalCluster0.max))
                    {importance = 0.0;
                }
                else if(PARAMS.cluster1 && node.model.energy_beg >= PARAMS.energyIntervalCluster1.min && node.model.energy_beg < (PARAMS.energyIntervalCluster1.max))
                    {importance = 1.0;
                }
                else if(PARAMS.cluster2 && node.model.energy_beg >= PARAMS.energyIntervalCluster2.min && node.model.energy_beg < (PARAMS.energyIntervalCluster2.max))
                    {importance = 2.0;
                    }
                else if (PARAMS.cluster3 && node.model.energy_beg >= PARAMS.energyIntervalCluster3.min && node.model.energy_beg < (PARAMS.energyIntervalCluster3.max)) {
                    importance = 3.0;
                }
                else if (PARAMS.cluster4 && node.model.energy_beg >= PARAMS.energyIntervalCluster4.min && node.model.energy_beg < (PARAMS.energyIntervalCluster4.max)) {
                    importance = 4.0;
                }
                else 
                    {importance = 4.0;
                }

                trackImportance.push(importance);

                let colorRGB = hexToRgb(node.model.color);
                trackColor.push(colorRGB.r / 255.0);
                trackColor.push(colorRGB.g / 255.0);
                trackColor.push(colorRGB.b / 255.0);
                trackColor.push(1.0);

                tracksData_masked[importance].push(node.model.position_beg[0]);
                tracksData_masked[importance].push(node.model.position_beg[1]);
                tracksData_masked[importance].push(node.model.position_beg[2]);

                tracksData_masked[importance].push(node.model.tangent_beg[0]);
                tracksData_masked[importance].push(node.model.tangent_beg[1]);
                tracksData_masked[importance].push(node.model.tangent_beg[2]);

                tracksData_masked[importance].push(node.model.position_end[0]);
                tracksData_masked[importance].push(node.model.position_end[1]);
                tracksData_masked[importance].push(node.model.position_end[2]);

                tracksData_masked[importance].push(node.model.tangent_end[0]);
                tracksData_masked[importance].push(node.model.tangent_end[1]);
                tracksData_masked[importance].push(node.model.tangent_end[2]);

                tracksTime_masked[importance].push(node.model.time_beg);
                tracksTime_masked[importance].push(node.model.time_end);
                tracksTime_masked[importance].push(0.0);

                trackEnergy_masked[importance].push(node.model.energy_beg);
                trackEnergy_masked[importance].push(node.model.energy_end);
                trackEnergy_masked[importance].push(0.0);

                trackImportance_masked[importance].push(importance);

                trackColor_masked[importance].push(colorRGB.r / 255.0);
                trackColor_masked[importance].push(colorRGB.g / 255.0);
                trackColor_masked[importance].push(colorRGB.b / 255.0);
                trackColor_masked[importance].push(1.0);
            }
                    
        });

        //console.log("testCount", testCount);

        limitT_Min = min_T;
        limitT_Max = max_T;

        limitT_Min_Animation = min_T;
        limitT_Max_Animation = max_T;

        console.log("trackImportance", trackImportance_masked[0], trackImportance_masked[1], trackImportance_masked[2], trackImportance_masked[3], trackImportance_masked[4]);

        lineStrip = new RC.ZSplines(
            tracksData,
            tracksTime,
            trackEnergy,
            samplePerTrack,
            trackWidth,
            limitT_Min,
            limitT_Max,
            trackColor,
            trackImportance, 
            false,
            true);

            //((points.length / 6)) / 2;
        //console.log("testCount", tracksData.length/12, tracksData_masked[2].length/12,
        //tracksData_masked[1].length/12, tracksData_masked[0].length/12, tracksData_masked[3].length/12);

        lineStrip.position.set(0, 0, 0);
                                                                                        
        lineStrip.scale.set(scale, scale, scale);
        lineStrip.setAnimationPattern(0.0);
        lineStrip.setColors(colors);
        lineStrip.drawOutline = false;
        lineStrip.material.transparent = false;


        for(let i=0; i<5; i++)
        {

            splineCluster[i] = new RC.ZSplines(
                tracksData_masked[4-i],
                tracksTime_masked[4-i],
                trackEnergy_masked[4-i],
                samplePerTrack,
                trackWidth,
                limitT_Min,
                limitT_Max,
                trackColor_masked[4-i],
                trackImportance_masked[4-i], true);
    
    
            splineCluster[i].position.set(0, 0, 0);                                                                                 
            splineCluster[i].scale.set(scale, scale, scale);
            splineCluster[i].setAnimationPattern(0.0);
            splineCluster[i].setColors(colors);
            splineCluster[i].drawOutline = false;
            splineCluster[i].material.transparent = false;
            splineCluster[i].visible = false;
        }

        window.dispatchEvent(new CustomEvent("AddSplines", { detail: [lineStrip, splineCluster[4], splineCluster[3], splineCluster[2], splineCluster[1], splineCluster[0]]}));
                                                                
    }
     
}


