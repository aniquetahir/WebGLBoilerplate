function AniqueEngine(canvas){
    this.gl=null;
    this.initWebGL = function(pCanvas){
        var gl=null;
        try{
            gl=pCanvas.getContext("webgl") || pCanvas.getContext("experimental-webgl");
        }catch(e){}

        if(!gl){
            console.log("unable to start webgl context");
            gl=null;
        }

        return gl;
    };

    this.getShader = function(gl,id){
        var shaderScript,theSource,currentChild,shader;
        shaderScript = document.getElementById(id);

        if(!shaderScript){
            return null;
        }

        theSource="";
        currentChild = shaderScript.firstChild;

        while(currentChild){
            if(currentChild.nodeType = currentChild.TEXT_node){
                theSource+=currentChild.textContent;
            }
            currentChild = currentChild.nextSibling;
        }

        if(shaderScript.type = "x-shader/x-vertex"){
            shader = gl.createShader(gl.VERTEX_SHADER);
        }else if(shaderScript.type= "x-shader/x-fragment"){
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }else{
            return null;
        }

        gl.shaderSource(shader,theSource);
        gl.compileShader(shader);

        if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
            console.log("Shader Compilation Failed");
            return null;
        }

        return shader;
    };

    this.initShaders = function(){
        var vertexShader = this.getShader(this.gl,'shader-vs');
        var fragmentShader = this.getShader(this.gl,'shader-fs');

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram,vertexShader);
        this.gl.attachShader(this.shaderProgram,fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        if(!this.gl.getProgramParameter(this.shaderProgram,this.gl.LINK_STATUS)){
            console.log("Unable to link shader program");
        }

        this.vertexPositionAttribute = this.gl.getAttribLocation(shaderProgram,"aVertexPosition");
        this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
    };

    this.initBuffers = function(){
        this.squareVerticesBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER,this.squareVerticesBuffer);

        var vertices = [
            1.0,1.0,0.0,
            -1.0,1.0,0.0,
            -1.0,1.0,0.0,
            -1.0,-1.0,0.0
        ];

        this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(vertices),this.gl.STATIC_DRAW);

    };

    this.init = function(){
        this.gl=this.initWebGL(canvas);
        if(this.gl){
            this.gl.clearColor(0.0,0.0,0.0,1.0);
            this.gl.clearDepth(1.0);
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.depthFunc(this.gl.LEQUAL);


            //init shaders
            this.initShaders();

            //init buffers
            this.initBuffers();

            //draw scene
            this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);

        }
    }
}