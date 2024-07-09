import Signal from 'signals';

interface SignalObj<T = any> {
	add(listener: (...params: T[]) => void, listenerContext?: any, priority?: Number): void;
	addOnce(listener: (...params: T[]) => void, listenerContext?: any, priority?: Number): void;
	dispatch(...params: T[]): void;
	remove(listener: (...params: T[]) => void, context?: any): void;
	removeAll(): void;
	setActive(active: boolean): void;
	halt(): void;
	dispose(): void;
	has(listener: (...params: T[]) => void, context?: any): boolean;
	active: boolean;
}

interface SignalRegister {
	[s: string]: SignalObj;
}

/**
 * Editor
 * @path src/core/Editor.js
 */
const editorSignals: SignalRegister = {
	// 脚本
	editScript: new Signal(),

	// xr
	enterXR: new Signal(),
	offerXR: new Signal(),
	leaveXR: new Signal(),

	// 通知
	editorCleared: new Signal(),

	transformModeChanged: new Signal(),
	snapChanged: new Signal(),
	spaceChanged: new Signal(),
	rendererCreated: new Signal(),
	rendererUpdated: new Signal(),
	rendererDetectKTX2Support: new Signal(),

	sceneBackgroundChanged: new Signal(),
	sceneEnvironmentChanged: new Signal(),
	sceneFogChanged: new Signal(),
	sceneFogSettingsChanged: new Signal(),
	sceneGraphChanged: new Signal(),
	sceneRendered: new Signal(),

	cameraAdded: new Signal(),
	cameraRemoved: new Signal(),
	cameraChanged: new Signal(),
	cameraResetted: new Signal(),

	geometryChanged: new Signal(),

	objectSelected: new Signal(),
	objectFocused: new Signal(),
	objectFocusByUuid: new Signal(),

	objectAdded: new Signal(),
	objectChanged: new Signal(),
	objectRemoved: new Signal(),

	helperAdded: new Signal(),
	helperRemoved: new Signal(),

	materialAdded: new Signal(),
	materialChanged: new Signal(),
	materialRemoved: new Signal(),
	materialCurrentSlotChange:new Signal(),

	scriptAdded: new Signal(),
	scriptChanged: new Signal(),
	scriptRemoved: new Signal(),

	sceneResize: new Signal(),

	showGridChanged: new Signal(),
	showHelpersChanged: new Signal(),
	refreshSidebarObject3D: new Signal(),
	historyChanged: new Signal(),

	viewportCameraChanged: new Signal(),
	viewportShadingChanged: new Signal(),

	intersectionsDetected: new Signal(),

	pathTracerUpdated: new Signal(),

	// 实例化ShaderMaterial类型内置材质
	instantiateShaderMaterial: new Signal(),

	// 场景加载完成
	sceneLoadComplete: new Signal(),
};

/**
 * Viewport
 * @path src/core/Viewport.js
 */
const viewportSignals:SignalRegister = {
	loadDefaultEnvAndBackground:new Signal(),
	IFCPropertiesVisible:new Signal(),
	// 补间动画管理
	tweenAdd:new Signal(),
	tweenRemove:new Signal(),
}

/**
 * 网络请求相关
 */
const netWorkSignals:SignalRegister = {
	switchViewportLoading:new Signal(),
	changeViewportLoadingText:new Signal(),
}

/**
 * cesium 相关页面使用的
 */
const cesiumSignals:SignalRegister = {
	// cesium/viewPort.ts 停止渲染循环
	cesium_stopLoop:new Signal(),
	// cesium融合场景下的threejs scene点击事件
	cesium_clickThreeScene:new Signal(),
	//销毁viewPort
	cesium_destroy:new Signal(),
	// 飞行定位
	cesium_flyTo: new Signal(),
}

/**
 * 图纸 相关
 */
const drawingSignals:SignalRegister = {
	drawingMarkDone:new Signal(),  // 新增/编辑 图纸标记完成回调
	cadViewerResize:new Signal(), // 图纸面板移动
}

/**
 * 其他不便分类的
 */
const otherSignals:SignalRegister = {
	// views/layout.vue 当前场景类型变更
	changCurrentSceneType:new Signal(),
	// 本地化语言切换
	changeLocaleLanguage:new Signal()
}

export const SignalsRegister: SignalRegister = {
	...editorSignals,
	...viewportSignals,
	...netWorkSignals,
	...cesiumSignals,
	...drawingSignals,
	...otherSignals
};
