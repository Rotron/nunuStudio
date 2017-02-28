"use strict";

function MaterialLoader(manager)
{
	this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
	this.textures = {};
}

MaterialLoader.prototype.load = function(url, onLoad, onProgress, onError)
{
	var scope = this;

	var loader = new FileLoader(scope.manager);
	loader.load(url, function(text)
	{
		onLoad(scope.parse(JSON.parse(text)));
	}, onProgress, onError);
};

MaterialLoader.prototype.setTextures = function(value)
{
	this.textures = value;
};

MaterialLoader.prototype.parse = function(json)
{
	var textures = this.textures;

	function getTexture(name)
	{
		if(textures[name] === undefined)
		{
			console.warn("THREE.MaterialLoader: Undefined texture", name);
		}

		return textures[name];
	}

	var material = new window[json.type]();

	if(json.uuid !== undefined)
	{
		material.uuid = json.uuid;
	}
	if(json.name !== undefined)
	{
		material.name = json.name;
	}

	//Color
	if(json.color !== undefined)
	{
		material.color.setHex(json.color);
	}
	
	//Roughness and metalness (Standard, PBR)
	if(json.roughness !== undefined)
	{
		material.roughness = json.roughness;
	}
	if(json.metalness !== undefined)
	{
		material.metalness = json.metalness;
	}

	//Emissive
	if(json.emissive !== undefined)
	{
		material.emissive.setHex(json.emissive);
	}

	//Specular
	if(json.specular !== undefined)
	{
		material.specular.setHex(json.specular);
	}

	//Shininess
	if(json.shininess !== undefined)
	{
		material.shininess = json.shininess;
	}
	
	//Clear coat (PBR)
	if(json.clearCoat !== undefined)
	{
		material.clearCoat = json.clearCoat;
	}
	if(json.clearCoatRoughness !== undefined)
	{
		material.clearCoatRoughness = json.clearCoatRoughness;
	}
	
	//Shader params (Shader)
	if(json.uniforms !== undefined)
	{
		material.uniforms = json.uniforms;
	}
	if(json.vertexShader !== undefined)
	{
		material.vertexShader = json.vertexShader;
	}
	if(json.fragmentShader !== undefined)
	{
		material.fragmentShader = json.fragmentShader;
	}
	
	//Shading 
	if(json.vertexColors !== undefined)
	{
		material.vertexColors = json.vertexColors;
	}
	if(json.fog !== undefined)
	{
		material.fog = json.fog;
	}
	if(json.shading !== undefined)
	{
		material.shading = json.shading;
	}
	if(json.blending !== undefined)
	{
		material.blending = json.blending;
	}
	if(json.side !== undefined)
	{
		material.side = json.side;
	}

	//Opacity and transparency
	if(json.opacity !== undefined)
	{
		material.opacity = json.opacity;
	}
	if(json.transparent !== undefined)
	{
		material.transparent = json.transparent;
	}
	
	//Tests
	if(json.alphaTest !== undefined)
	{
		material.alphaTest = json.alphaTest;
	}
	if(json.depthTest !== undefined)
	{
		material.depthTest = json.depthTest;
	}
	if(json.depthWrite !== undefined)
	{
		material.depthWrite = json.depthWrite;
	}
	if(json.colorWrite !== undefined)
	{
		material.colorWrite = json.colorWrite;
	}

	//Wireframe
	if(json.wireframe !== undefined)
	{
		material.wireframe = json.wireframe;
	}
	if(json.wireframeLinewidth !== undefined)
	{
		material.wireframeLinewidth = json.wireframeLinewidth;
	}
	if(json.wireframeLinecap !== undefined)
	{
		material.wireframeLinecap = json.wireframeLinecap;
	}
	if(json.wireframeLinejoin !== undefined)
	{
		material.wireframeLinejoin = json.wireframeLinejoin;
	}

	//Morphing
	if(json.morphTargets !== undefined)
	{
		material.morphTargets = json.morphTargets;
	}
	if(json.morphNormals !== undefined)
	{
		material.morphNormals = json.morphNormals;
	}

	//Size (PointsMaterial)
	if(json.size !== undefined)
	{
		material.size = json.size;
	}
	if(json.sizeAttenuation !== undefined)
	{
		material.sizeAttenuation = json.sizeAttenuation;
	}

	//Color map
	if(json.map !== undefined)
	{
		material.map = getTexture(json.map);
	}

	//Alpha map
	if(json.alphaMap !== undefined)
	{
		material.alphaMap = getTexture(json.alphaMap);
		material.transparent = true;
	}

	//Bump map
	if(json.bumpMap !== undefined)
	{
		material.bumpMap = getTexture(json.bumpMap);
	}
	if(json.bumpScale !== undefined)
	{
		material.bumpScale = json.bumpScale;
	}

	//Normal map
	if(json.normalMap !== undefined)
	{
		material.normalMap = getTexture(json.normalMap);
	}
	if(json.normalScale !== undefined)
	{
		var normalScale = json.normalScale;

		if(Array.isArray(normalScale) === false)
		{
			//Blender exporter used to export a scalar. See #7459
			normalScale = [normalScale, normalScale];
		}

		material.normalScale = new Vector2().fromArray(normalScale);
	}

	//Displacement map
	if(json.displacementMap !== undefined)
	{
		material.displacementMap = getTexture(json.displacementMap);
	}
	if(json.displacementScale !== undefined)
	{
		material.displacementScale = json.displacementScale;
	}
	if(json.displacementBias !== undefined)
	{
		material.displacementBias = json.displacementBias;
	}

	//Roughtness and metalness map
	if(json.roughnessMap !== undefined)
	{
		material.roughnessMap = getTexture(json.roughnessMap);
	}
	if(json.metalnessMap !== undefined)
	{
		material.metalnessMap = getTexture(json.metalnessMap);
	}

	//Emissive map
	if(json.emissiveMap !== undefined)
	{
		material.emissiveMap = getTexture(json.emissiveMap);
	}
	if(json.emissiveIntensity !== undefined)
	{
		material.emissiveIntensity = json.emissiveIntensity;
	}

	//Specular map
	if(json.specularMap !== undefined)
	{
		material.specularMap = getTexture(json.specularMap);
	}

	//Environemnt map
	if(json.envMap !== undefined)
	{
		material.envMap = getTexture(json.envMap);
	}
	if(json.reflectivity !== undefined)
	{
		material.reflectivity = json.reflectivity;
	}
	if(json.envMapIntensity !== undefined)
	{
		material.envMapIntensity = json.envMapIntensity;
	}
	if(json.combine !== undefined)
	{
		material.combine = json.combine;
	}
	if(json.refractionRatio !== undefined)
	{
		material.refractionRatio = json.refractionRatio;
	}
	
	//Light map
	if(json.lightMap !== undefined)
	{
		material.lightMap = getTexture(json.lightMap);
	}
	if(json.lightMapIntensity !== undefined)
	{
		material.lightMapIntensity = json.lightMapIntensity;
	}

	//Ambient occlusion map
	if(json.aoMap !== undefined)
	{
		material.aoMap = getTexture(json.aoMap);
	}
	if(json.aoMapIntensity !== undefined)
	{
		material.aoMapIntensity = json.aoMapIntensity;
	}

	//Gradient map
	if(json.gradientMap !== undefined)
	{
		material.gradientMap = getTexture(json.gradientMap);
	}

	//TODO <REMOVE MULTI MATERIAL>
	//MultiMaterial
	if(json.materials !== undefined)
	{
		for (var i = 0, l = json.materials.length; i < l; i ++)
		{
			material.materials.push(this.parse(json.materials[i]));
		}
	}

	return material;
};