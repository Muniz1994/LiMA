import React, { useRef, useEffect, useState, useCallback } from 'react';

import * as THREE from "three";
import * as OBC from "openbim-components";

import {Viewer, WebIFCLoaderPlugin, ContextMenu, TreeViewPlugin, CityJSONLoaderPlugin, LineSet} from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";


export const ViewerXeokit = ({ifcFile, highlightedElements}) => {

    const [container, setContainer] = useState(null);
    const [viewer, setViewer] = useState(null);
    const [sceneModel, setSceneModel] = useState(null);


    const inputRef = useCallback((node) => {

        setContainer(node)

    }, [container])

    useEffect(() => {

        console.log(ifcFile);

        if (container && ifcFile) {

            //------------------------------------------------------------------------------------------------------------------
             // Create a Viewer, arrange the camera
             //------------------------------------------------------------------------------------------------------------------
            const viewer = new Viewer({
                canvasId: "myCanvas",
                transparent: true
            });
            
            setViewer(viewer);
 
             viewer.camera.eye = [-2.56, 8.38, 8.27];
             viewer.camera.look = [13.44, 3.31, -14.83];
             viewer.camera.up = [0.10, 0.98, -0.14];
 
             viewer.scene.xrayMaterial.fill = true;
             viewer.scene.xrayMaterial.fillAlpha = 0.1;
             viewer.scene.xrayMaterial.fillColor = [0, 0, 0];
             viewer.scene.xrayMaterial.edgeAlpha = 0.3;
             viewer.scene.xrayMaterial.edgeColor = [0, 0, 0];
 
             viewer.scene.highlightMaterial.fill = true;
             viewer.scene.highlightMaterial.edges = true;
             viewer.scene.highlightMaterial.fillAlpha = 0.1;
             viewer.scene.highlightMaterial.edgeAlpha = 0.1;
             viewer.scene.highlightMaterial.edgeColor = [1, 1, 0];
 
             viewer.scene.selectedMaterial.fill = true;
             viewer.scene.selectedMaterial.edges = true;
             viewer.scene.selectedMaterial.fillAlpha = 0.5;
             viewer.scene.selectedMaterial.edgeAlpha = 0.6;
             viewer.scene.selectedMaterial.edgeColor = [0, 1, 1];
 
             viewer.cameraControl.followPointer = true;
         
 
             //------------------------------------------------------------------------------------------------------------------
             // Create two ContextMenus - one for right-click on empty space, the other for right-click on an Entity
             //------------------------------------------------------------------------------------------------------------------
 
            //  const canvasContextMenu = new ContextMenu({
            //      enabled: true,
            //      context: {
            //          viewer: viewer
            //      },
            //      items: [
            //          [
            //              {
            //                  title: "Hide All",
            //                  getEnabled: function (context) {
            //                      return (context.viewer.scene.numVisibleObjects > 0);
            //                  },
            //                  doAction: function (context) {
            //                      context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
            //                  }
            //              },
            //              {
            //                  title: "Show All",
            //                  getEnabled: function (context) {
            //                      const scene = context.viewer.scene;
            //                      return (scene.numVisibleObjects < scene.numObjects);
            //                  },
            //                  doAction: function (context) {
            //                      const scene = context.viewer.scene;
            //                      scene.setObjectsVisible(scene.objectIds, true);
            //                      scene.setObjectsXRayed(scene.xrayedObjectIds, false);
            //                      scene.setObjectsSelected(scene.selectedObjectIds, false);
            //                  }
            //              }
            //          ],
            //          [
            //              {
            //                  title: "View Fit All",
            //                  doAction: function (context) {
            //                      context.viewer.cameraFlight.flyTo({
            //                          aabb: context.viewer.scene.getAABB()
            //                      });
            //                  }
            //              }
            //          ]
            //      ]
            //  });
 
            //  const objectContextMenu = new ContextMenu({
            //      items: [
            //          [
            //              {
            //                  title: "View Fit",
            //                  doAction: function (context) {
            //                      const viewer = context.viewer;
            //                      const scene = viewer.scene;
            //                      const entity = context.entity;
            //                      viewer.cameraFlight.flyTo({
            //                          aabb: entity.aabb,
            //                          duration: 0.5
            //                      }, () => {
            //                          setTimeout(function () {
            //                              scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
            //                          }, 500);
            //                      });
            //                  }
            //              },
            //              {
            //                  title: "View Fit All",
            //                  doAction: function (context) {
            //                      const scene = context.viewer.scene;
            //                      context.viewer.cameraFlight.flyTo({
            //                          projection: "perspective",
            //                          aabb: scene.getAABB(),
            //                          duration: 0.5
            //                      });
            //                  }
            //              },
            //              {
            //                  title: "Show in Tree",
            //                  doAction: function (context) {
            //                      const objectId = context.entity.id;
            //                      context.treeViewPlugin.showNode(objectId);
            //                  }
            //              }
            //          ],
            //          [
            //              {
            //                  title: "Hide",
            //                  getEnabled: function (context) {
            //                      return context.entity.visible;
            //                  },
            //                  doAction: function (context) {
            //                      context.entity.visible = false;
            //                  }
            //              },
            //              {
            //                  title: "Hide Others",
            //                  doAction: function (context) {
            //                      const viewer = context.viewer;
            //                      const scene = viewer.scene;
            //                      const entity = context.entity;
            //                      const metaObject = viewer.metaScene.metaObjects[entity.id];
            //                      if (!metaObject) {
            //                          return;
            //                      }
            //                      scene.setObjectsVisible(scene.visibleObjectIds, false);
            //                      scene.setObjectsXRayed(scene.xrayedObjectIds, false);
            //                      scene.setObjectsSelected(scene.selectedObjectIds, false);
            //                      scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
            //                      metaObject.withMetaObjectsInSubtree((metaObject) => {
            //                          const entity = scene.objects[metaObject.id];
            //                          if (entity) {
            //                              entity.visible = true;
            //                          }
            //                      });
            //                  }
            //              },
            //              {
            //                  title: "Hide All",
            //                  getEnabled: function (context) {
            //                      return (context.viewer.scene.numVisibleObjects > 0);
            //                  },
            //                  doAction: function (context) {
            //                      context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
            //                  }
            //              },
            //              {
            //                  title: "Show All",
            //                  getEnabled: function (context) {
            //                      const scene = context.viewer.scene;
            //                      return (scene.numVisibleObjects < scene.numObjects);
            //                  },
            //                  doAction: function (context) {
            //                      const scene = context.viewer.scene;
            //                      scene.setObjectsVisible(scene.objectIds, true);
            //                  }
            //              }
            //          ],
            //          [
            //              {
            //                  title: "X-Ray",
            //                  getEnabled: function (context) {
            //                      return (!context.entity.xrayed);
            //                  },
            //                  doAction: function (context) {
            //                      context.entity.xrayed = true;
            //                  }
            //              },
            //              {
            //                  title: "Undo X-Ray",
            //                  getEnabled: function (context) {
            //                      return context.entity.xrayed;
            //                  },
            //                  doAction: function (context) {
            //                      context.entity.xrayed = false;
            //                  }
            //              },
            //              {
            //                  title: "X-Ray Others",
            //                  doAction: function (context) {
            //                      const viewer = context.viewer;
            //                      const scene = viewer.scene;
            //                      const entity = context.entity;
            //                      const metaObject = viewer.metaScene.metaObjects[entity.id];
            //                      if (!metaObject) {
            //                          return;
            //                      }
            //                      scene.setObjectsVisible(scene.objectIds, true);
            //                      scene.setObjectsXRayed(scene.objectIds, true);
            //                      scene.setObjectsSelected(scene.selectedObjectIds, false);
            //                      scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
            //                      metaObject.withMetaObjectsInSubtree((metaObject) => {
            //                          const entity = scene.objects[metaObject.id];
            //                          if (entity) {
            //                              entity.xrayed = false;
            //                          }
            //                      });
            //                  }
            //              },
            //              {
            //                  title: "Reset X-Ray",
            //                  getEnabled: function (context) {
            //                      return (context.viewer.scene.numXRayedObjects > 0);
            //                  },
            //                  doAction: function (context) {
            //                      context.viewer.scene.setObjectsXRayed(context.viewer.scene.xrayedObjectIds, false);
            //                  }
            //              }
            //          ],
            //          [
            //              {
            //                  title: "Select",
            //                  getEnabled: function (context) {
            //                      return (!context.entity.selected);
            //                  },
            //                  doAction: function (context) {
            //                      context.entity.selected = true;
            //                  }
            //              },
            //              {
            //                  title: "Undo select",
            //                  getEnabled: function (context) {
            //                      return context.entity.selected;
            //                  },
            //                  doAction: function (context) {
            //                      context.entity.selected = false;
            //                  }
            //              },
            //              {
            //                  title: "Clear Selection",
            //                  getEnabled: function (context) {
            //                      return (context.viewer.scene.numSelectedObjects > 0);
            //                  },
            //                  doAction: function (context) {
            //                      context.viewer.scene.setObjectsSelected(context.viewer.scene.selectedObjectIds, false);
            //                  }
            //              }
            //          ]
            //      ],
            //      enabled: true
            //  });
 
            //  viewer.cameraControl.on("rightClick", function (e) {
 
            //      var hit = viewer.scene.pick({
            //          canvasPos: e.canvasPos
            //      });
 
            //      if (hit && hit.entity.isObject) {
 
            //          objectContextMenu.context = { // Must set context before showing menu
            //              viewer: viewer,
            //              entity: hit.entity
            //          };
 
            //          objectContextMenu.show(e.pagePos[0], e.pagePos[1]);
 
            //      } else {
 
            //          canvasContextMenu.context = { // Must set context before showing menu
            //              viewer: viewer
            //          };
 
            //          canvasContextMenu.show(e.pagePos[0], e.pagePos[1]);
            //      }
 
            //      e.event.preventDefault();
            //  });
 
             // const city = new CityJSONLoaderPlugin(viewer)
 
             // const model = city.load({ // Returns an Entity that represents the model
             //     id: "myModel1",
             //     src: "example.city.json",
             //     saoEnabled: true,
             //     edges: false,
             //     rotation: [-90,0,0],
             //     scale: [0.5, 0.5, 0.5],
             //     origin: [100, 0, 0]
             // });
 
             const webIFCLoader = new WebIFCLoaderPlugin(viewer, {
                 wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/"
             });
 
             
             const sceneModel =
                 webIFCLoader.load({
                src: ifcFile,
                excludeTypes: ["IfcSpace"],
                edges: true
        
        });

            setSceneModel(sceneModel);


 
        //  //------------------------------------------------------------------------------------------------------------------
        //  // Mouse over entities to highlight them
        //  //------------------------------------------------------------------------------------------------------------------
 
        //  var lastEntity = null;
 
        //  viewer.cameraControl.on("hover", function (pickResult) {
 
        //      if (pickResult) {
 
        //          if (!lastEntity || pickResult.entity.id !== lastEntity.id) {
 
        //              if (lastEntity) {
        //                  lastEntity.highlighted = false;
        //              }
 
        //              lastEntity = pickResult.entity;
        //              pickResult.entity.highlighted = true;
        //          }
        //      } else {
 
        //          if (lastEntity) {
        //              lastEntity.highlighted = false;
        //              lastEntity = null;
        //          }
        //      }
        //  });
 
         window.viewer = viewer;
 
        

    }}, [container, ifcFile]);

    useEffect(() => {

        if (sceneModel && viewer) {
            sceneModel.on("loaded", () => {
    
                viewer.scene.setObjectsSelected(highlightedElements, true);
    
            });
        }

    }, [highlightedElements])


    return (

        <canvas id='myCanvas' className='full-screen' ref={inputRef}></canvas>
    );

}
