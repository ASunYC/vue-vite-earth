import { Engine, Scene, FreeCamera, Vector3, MeshBuilder, StandardMaterial, Color3, HemisphericLight } from "@babylonjs/core";

export function init(options) {
    options.container = options.container ? options.container : '';
    var mapContainer = document.getElementById(options.container);
    if (!mapContainer) {
        return;
    }
    const engine = new Engine(mapContainer);
    const scene = new Scene(engine);

    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(mapContainer, true);

    new HemisphericLight("light", Vector3.Up(), scene);

    const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    const material = new StandardMaterial("box-material", scene);
    material.diffuseColor = Color3.Blue();
    box.material = material;

    engine.runRenderLoop(() => {
        scene.render();
    });
}

export function isSupportWebGL2() {
    let result = false;
    // 创建一个canvas元素
    var canvas = document.createElement('canvas');
    // 设置canvas的宽度和高度（可选）
    canvas.width = 800;
    canvas.height = 600;
    // 将canvas添加到body的末尾（或其他你想要的DOM元素中）
    document.body.appendChild(canvas);
    // 尝试获取WebGL 2上下文
    var gl = canvas.getContext('webgl2') || canvas.getContext('experimental-webgl2');
    if (!gl) {
        // WebGL 2不可用，尝试获取WebGL 1上下文
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            // WebGL 1也不可用
            alert('Your browser does not support WebGL.');
        } else {
            // WebGL 1可用，但注意此时不能调用WebGL 2特有的方法
            console.log('WebGL 1 is supported.');
        }
    } else {
        // WebGL 2可用
        console.log('WebGL 2 is supported.');
    }
    if ('gpu' in navigator) {
        console.log('WebGPU is supported.');
        result = true;
        // 接下来可以进一步尝试获取适配器（Adapter）和设备（Device）等
    } else {
        console.log('WebGPU is not supported.');
    }
    if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
    }
    // 可选：将canvas引用设置为null，以帮助垃圾回收（虽然现代浏览器会自动处理）
    canvas = null;
    return result;
}