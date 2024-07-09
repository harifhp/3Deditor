import {ShaderMaterial, Vector2} from "three";
import {useAddSignal} from "@/hooks/useSignal";
import {CircleGridShaderMaterial} from "@/core/shaderMaterial/modules/CircleGridShaderMaterial";
import {DynamicCheckerboardShaderMaterial} from "@/core/shaderMaterial/modules/DynamicCheckerboardShaderMaterial";
import {FlickerShaderMaterial} from "@/core/shaderMaterial/modules/FlickerShaderMaterial";
import {SlowSmokeShaderMaterial} from "@/core/shaderMaterial/modules/SlowSmokeShaderMaterial";
import {StreamerWallShaderMaterial} from "@/core/shaderMaterial/modules/StreamerWallShaderMaterial";


interface IShaderMaterialClass {
    Name: string,
    _ShaderMaterial: ShaderMaterial,
    Resolution?: Vector2,
    Update: () => void,
}

export class ShaderMaterialManager {
    shaderMaterials: IShaderMaterialClass[] = [];
    classMap: { [className: string]: string } = {};

    constructor() {
        useAddSignal("instantiateShaderMaterial", (shaderMaterialClass: IShaderMaterialClass) => {
            this.push(shaderMaterialClass);
        })
        useAddSignal("sceneResize", (width: number, height: number) => {
            const resolution = new Vector2(width, height);
            this.shaderMaterials.forEach(sm => {
                sm.Resolution = resolution;
            })
        })
        useAddSignal("sceneLoadComplete", () => {
            this.init();
        })
    }

    get needRender() {
        return this.shaderMaterials.length > 0;
    }

    init() {
        if(!window.editor.metadata._ShaderMaterialClassMap) return;

        this.classMap = window.editor.metadata._ShaderMaterialClassMap;
        if (this.classMap) {
            for (let className in this.classMap) {
                const material = window.editor.materials[this.classMap[className]];

                switch (className) {
                    case "CircleGridShaderMaterial":
                        CircleGridShaderMaterial.Material = material;
                        this.shaderMaterials.push(CircleGridShaderMaterial);
                        break;
                    case "DynamicCheckerboardShaderMaterial":
                        DynamicCheckerboardShaderMaterial.Material = material;
                        this.shaderMaterials.push(DynamicCheckerboardShaderMaterial);
                        break;
                    case "FlickerShaderMaterial":
                        FlickerShaderMaterial.Material = material;
                        this.shaderMaterials.push(FlickerShaderMaterial);
                        break;
                    case "SlowSmokeShaderMaterial":
                        SlowSmokeShaderMaterial.Material = material;
                        this.shaderMaterials.push(SlowSmokeShaderMaterial);
                        break;
                    case "StreamerWallShaderMaterial":
                        StreamerWallShaderMaterial.Material = material;
                        this.shaderMaterials.push(StreamerWallShaderMaterial);
                        break;
                }
            }
        }
    }

    push(sm: IShaderMaterialClass) {
        this.shaderMaterials.push(sm);

        this.classMap[sm.Name] = sm._ShaderMaterial.uuid;
        window.editor.metadata._ShaderMaterialClassMap = this.classMap;
    }

    update() {
        for (let i = 0; i < this.shaderMaterials.length; i++) {
            this.shaderMaterials[i].Update();
        }
    }
}