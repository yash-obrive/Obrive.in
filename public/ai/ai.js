
const DEFAULT_AGENT_ID = 'agent_4201k6mkfkg0epv9wdr4hdn3fp38';

// Resolve AGENT_ID from multiple possible sources so you can override it without editing this file:
let AGENT_ID = (typeof window !== 'undefined' && window.ELEVENLABS_AGENT_ID) || DEFAULT_AGENT_ID;

// Try to read data-agent-id from the script tag if present (works when script tag has id="eleven-ai")
function tryReadAgentFromScriptTag() { 
  try {
    // Prefer an explicit script element with id 'eleven-ai'
    const scriptEl = document.getElementById('eleven-ai') || Array.from(document.getElementsByTagName('script')).find(s => s.src && s.src.includes('/ai/ai.js'));
    if (scriptEl && scriptEl.dataset && scriptEl.dataset.agentId) {
      AGENT_ID = scriptEl.dataset.agentId;
    }
  } catch (e) {
    // ignore
  }
}

// If DOM is already available, try to read the script tag now; otherwise try later during injection
if (typeof document !== 'undefined' && document.readyState !== 'loading') {
  tryReadAgentFromScriptTag();
}

// OPTIONAL: Change navigation behavior
const OPEN_IN_NEW_TAB = false; // true = new tab, false = same tab

// OPTIONAL: Change widget position
const WIDGET_POSITION = 'bottom-right'; // 'bottom-right', 'bottom-left', 'top-right', 'top-left'

// OPTIONAL: Base URL for navigation (leave empty for auto-detection)
const BASE_URL = 'https://obrive.com';

// ============================================================================
// DON'T CHANGE ANYTHING BELOW THIS LINE
// ============================================================================

// Create and inject the widget with client tools
function injectElevenLabsWidget() {
  const ID = 'elevenlabs-convai-widget';
  
  // Check if the widget is already loaded
  if (document.getElementById(ID)) {
    return;
  }

  // Create widget script
  // Before we load the external embed, install a small, reversible network rewrite
  // This intercepts fetch/XHR calls and rewrites any convai widget URL that contains
  // an unexpected agent id to use the AGENT_ID we resolved above. This is a defensive
  // hotfix so the embed requests the agent you want while we diagnose server-side mapping.
  (function installAgentUrlRewrite() {
    try {
      const desired = AGENT_ID;
      if (!desired) return;

      // Patch fetch (async wrapper so we can inspect responses)
      const origFetch = window.fetch;
      window.fetch = async function(input, init) {
        let finalInput = input;
        try {
          let url = (typeof finalInput === 'string') ? finalInput : finalInput && finalInput.url;
          if (typeof url === 'string' && url.includes('/convai/agents/') && !url.includes(desired)) {
            const newUrl = url.replace(/(\/convai\/agents\/)[^\/]+(\/widget)/, `$1${desired}$2`);
            console.info('[ElevenLabs ConvAI] Rewriting fetch URL:', url, '->', newUrl);
            finalInput = (typeof finalInput === 'string') ? newUrl : new Request(newUrl, finalInput);
            url = newUrl;
          }

          const res = await origFetch.call(this, finalInput, init);

          // If this is a widget-config request, log the response body for diagnosis
          try {
            if (typeof url === 'string' && url.includes('/convai/agents/') && url.includes('/widget')) {
              const clone = res.clone();
              clone.text().then(text => {
                //console.info('[ElevenLabs ConvAI] widget response for', url, ':', text);
              }).catch(e => console.warn('failed to read widget response body', e));
            }
          } catch (e) {
            console.warn('widget response logging failed', e);
          }

          return res;
        } catch (e) {
          //console.warn('agent-url-rewrite fetch patch error', e);
          return origFetch.call(this, finalInput, init);
        }
      };

      // Patch XHR
      const origOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url) {
        try {
          if (typeof url === 'string' && url.includes('/convai/agents/') && !url.includes(desired)) {
            const newUrl = url.replace(/(\/convai\/agents\/)[^\/]+(\/widget)/, `$1${desired}$2`);
            console.info('[ElevenLabs ConvAI] Rewriting XHR URL:', url, '->', newUrl);
            return origOpen.apply(this, [method, newUrl].concat(Array.prototype.slice.call(arguments, 2)));
          }
        } catch (e) { console.warn('agent-url-rewrite xhr patch error', e); }
        return origOpen.apply(this, arguments);
      };
    } catch (e) {
      console.warn('installAgentUrlRewrite failed', e);
    }
  })();

  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
  script.async = true;
  script.type = 'text/javascript';
  document.head.appendChild(script);

  // Inject styles for Orion Assistive Ball and collapsible card
  if (!document.getElementById('orion-assistive-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'orion-assistive-styles';
    styleEl.textContent = `
      .orion-assistive-ball {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 2px solid rgba(156, 229, 208, 0.4);
        background: #00382e;
        cursor: pointer;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2147483646;
        box-shadow: 0 4px 14px rgba(0, 43, 35, 0.45);
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
        outline: none;
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
      }
      .orion-assistive-ball:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 56, 46, 0.6);
      }
      .orion-assistive-ball:active {
        transform: scale(0.95);
      }
      .orion-assistive-ball.orion-hidden {
        display: none !important;
      }
      .orion-ball-canvas-wrap {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .orion-assistive-canvas {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
      .convai-widget {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 2147483645 !important;
        transition: opacity 0.25s ease, transform 0.25s ease;
      }
      .convai-widget.orion-collapsed {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      .convai-widget.orion-expanded {
        display: block !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      }
      .orion-close-cross-btn {
        position: absolute;
        top: 10px;
        right: 12px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(0, 43, 35, 0.7);
        border: 1px solid rgba(156, 229, 208, 0.4);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        z-index: 2147483647;
        transition: all 0.2s ease;
        backdrop-filter: blur(6px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }
      .orion-close-cross-btn:hover {
        background: rgba(0, 43, 35, 0.95);
        border-color: #a4efe0;
        transform: scale(1.1);
        color: #a4efe0;
      }
    `;
    document.head.appendChild(styleEl);
  }

  // WebGL Orb Renderer (exact shader and mechanism from the ElevenLabs card)
  const ORB_FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uOffsets[7];
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform sampler2D uPerlinTexture;

in vec2 vUv;
out vec4 outColor;

const float PI = 3.14159265358979323846;

bool drawOval(vec2 polarUv, vec2 polarCenter, float a, float b, bool reverseGradient, float softness, out vec4 color) {
    vec2 p = polarUv - polarCenter;
    float oval = (p.x * p.x) / (a * a) + (p.y * p.y) / (b * b);
    float edge = smoothstep(1.0, 1.0 - softness, oval);
    if (edge > 0.0) {
        float gradient = reverseGradient ? (1.0 - (p.x / a + 1.0) / 2.0) : ((p.x / a + 1.0) / 2.0);
        color = vec4(vec3(gradient), 0.8 * edge);
        return true;
    }
    return false;
}

vec3 colorRamp(float grayscale, vec3 color1, vec3 color2, vec3 color3, vec3 color4) {
    if (grayscale < 0.33) {
        return mix(color1, color2, grayscale * 3.0);
    } else if (grayscale < 0.66) {
        return mix(color2, color3, (grayscale - 0.33) * 3.0);
    } else {
        return mix(color3, color4, (grayscale - 0.66) * 3.0);
    }
}

vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float n = mix(
        mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
            dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
        mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
            dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
        u.y
    );
    return 0.5 + 0.5 * n;
}

float sharpRing(vec2 uv, float theta, float time) {
    float ringStart = 1.0;
    float ringWidth = 0.5;
    float noiseScale = 5.0;
    vec2 noiseCoord = vec2(theta / (2.0 * PI), time * 0.1) * noiseScale;
    float noise = (noise2D(noiseCoord) - 0.5) * 4.0;
    return ringStart + noise * ringWidth * 1.5;
}

float smoothRing(vec2 uv, float time) {
    float angle = atan(uv.y, uv.x);
    if (angle < 0.0) angle += 2.0 * PI;
    vec2 noiseCoord = vec2(angle / (2.0 * PI), time * 0.1) * 6.0;
    float noise = (noise2D(noiseCoord) - 0.5) * 8.0;
    return 0.9 + noise * 0.3;
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float radius = length(uv);
    float theta = atan(uv.y, uv.x);
    if (theta < 0.0) theta += 2.0 * PI;

    vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
    float originalCenters[7] = float[7](0.0, 0.5 * PI, 1.0 * PI, 1.5 * PI, 2.0 * PI, 2.5 * PI, 3.0 * PI);
    float centers[7];
    for (int i = 0; i < 7; i++) {
        centers[i] = originalCenters[i] + 0.5 * sin(uTime / 20.0 + uOffsets[i]);
    }

    float a, b;
    vec4 ovalColor;
    for (int i = 0; i < 7; i++) {
        float noise = texture(uPerlinTexture, vec2(mod(centers[i] + uTime * 0.05, 1.0), 0.5)).r;
        a = noise * 1.5;
        b = noise * 4.5;
        bool reverseGradient = (i % 2 == 1);
        float distTheta = abs(theta - centers[i]);
        if (distTheta > PI) distTheta = 2.0 * PI - distTheta;
        if (drawOval(vec2(distTheta, radius), vec2(0.0, 0.0), a, b, reverseGradient, 0.4, ovalColor)) {
            color.rgb = mix(color.rgb, ovalColor.rgb, ovalColor.a);
            color.a = max(color.a, ovalColor.a);
        }
    }
    
    float ringRadius1 = sharpRing(uv, theta, uTime);
    float ringRadius2 = smoothRing(uv, uTime);
    float ringAlpha1 = (radius >= ringRadius1) ? 0.3 : 0.0;
    float ringAlpha2 = smoothstep(ringRadius2 - 0.05, ringRadius2 + 0.05, radius) * 0.25;
    float totalRingAlpha = max(ringAlpha1, ringAlpha2);
    
    vec3 ringColor = vec3(1.0);
    color.rgb = 1.0 - (1.0 - color.rgb) * (1.0 - ringColor * totalRingAlpha);

    vec3 color1 = vec3(0.0, 0.0, 0.0);
    vec3 color2 = uColor1;
    vec3 color3 = uColor2;
    vec3 color4 = vec3(1.0, 1.0, 1.0);

    color.rgb = colorRamp(color.r, color1, color2, color3, color4);
    outColor = color;
}
`;

  const ORB_VERTEX_SHADER = `#version 300 es
precision highp float;
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0, 1);
}
`;

  class OrionOrbRenderer {
    static noiseImage = null;
    constructor(canvas, color1 = '#59D0B5', color2 = '#CAEDE5') {
      this.canvas = canvas;
      try {
        this.gl = canvas.getContext('webgl2', { depth: false, stencil: false });
      } catch (e) {
        this.gl = null;
      }
      if (!this.gl) return;
      
      this.colorA = [0, 0, 0];
      this.colorB = [0, 0, 0];
      this.offsets = new Float32Array(7).map(() => Math.random() * Math.PI * 2);
      this.program = this.setupProgram();
      if (!this.program) return;
      
      const gl = this.gl;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([128, 128, 128, 255]));
      
      if (!OrionOrbRenderer.noiseImage) {
        OrionOrbRenderer.noiseImage = new Image();
        OrionOrbRenderer.noiseImage.crossOrigin = 'anonymous';
        OrionOrbRenderer.noiseImage.src = 'https://storage.googleapis.com/eleven-public-cdn/images/perlin-noise.png';
      }
      if (OrionOrbRenderer.noiseImage.complete) {
        this.copyNoiseImage();
      } else {
        OrionOrbRenderer.noiseImage.addEventListener('load', () => this.copyNoiseImage());
      }

      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      this.updateColors(color1, color2);

      this.canvas.width = 96;
      this.canvas.height = 96;
      this.gl.viewport(0, 0, 96, 96);

      this.startTime = performance.now();
      this.render = this.render.bind(this);
      this.rafId = requestAnimationFrame(this.render);
    }

    copyNoiseImage() {
      if (this.gl && OrionOrbRenderer.noiseImage) {
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, OrionOrbRenderer.noiseImage);
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
      }
    }

    updateColors(hex1, hex2) {
      if (!this.gl) return;
      this.colorA = this.parseColor('uColor1', hex1);
      this.colorB = this.parseColor('uColor2', hex2);
    }

    parseColor(uniformName, hex) {
      try {
        const n = parseInt(hex.slice(1, 3), 16) / 255;
        const r = parseInt(hex.slice(3, 5), 16) / 255;
        const i = parseInt(hex.slice(5, 7), 16) / 255;
        const rgb = [n ** 2.2, r ** 2.2, i ** 2.2];
        this.gl.uniform3fv(this.gl.getUniformLocation(this.program, uniformName), rgb);
        return rgb;
      } catch (e) {
        return [0, 0, 0];
      }
    }

    setupProgram() {
      const gl = this.gl;
      const fs = this.compileShader(gl.FRAGMENT_SHADER, ORB_FRAGMENT_SHADER);
      const vs = this.compileShader(gl.VERTEX_SHADER, ORB_VERTEX_SHADER);
      if (!fs || !vs) return null;
      const prog = gl.createProgram();
      gl.attachShader(prog, fs);
      gl.attachShader(prog, vs);
      gl.linkProgram(prog);
      gl.useProgram(prog);
      gl.uniform1i(gl.getUniformLocation(prog, 'uPerlinTexture'), 0);
      gl.uniform1fv(gl.getUniformLocation(prog, 'uOffsets'), this.offsets);
      return prog;
    }

    compileShader(type, src) {
      const gl = this.gl;
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }

    render() {
      if (!this.gl) return;
      const elapsed = (performance.now() - this.startTime) / 1000;
      this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'uTime'), elapsed);
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      this.rafId = requestAnimationFrame(this.render);
    }

    dispose() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.gl = null;
      this.program = null;
    }
  }

  // Create the Assistive Ball button with the animated WebGL orb from the card
  const ballBtn = document.createElement('button');
  ballBtn.id = 'orion-assistive-ball';
  ballBtn.className = 'orion-assistive-ball';
  ballBtn.setAttribute('aria-label', 'Open Orion Assistant');
  ballBtn.setAttribute('title', 'Orion here to help !');
  ballBtn.innerHTML = `
    <div class="orion-ball-canvas-wrap">
      <canvas id="orion-assistive-canvas" class="orion-assistive-canvas"></canvas>
    </div>
  `;

  // Instantiate the animated WebGL orb on the assistive ball canvas
  let orbRenderer = null;
  setTimeout(() => {
    const canvas = document.getElementById('orion-assistive-canvas');
    if (canvas) {
      orbRenderer = new OrionOrbRenderer(canvas, '#59D0B5', '#CAEDE5');
    }
  }, 50);

  // Create wrapper and widget (card is COLLAPSED by default)
  const wrapper = document.createElement('div');
  wrapper.id = 'orion-card-wrapper';
  wrapper.className = `convai-widget ${WIDGET_POSITION} orion-collapsed`;

  // Helper functions to open and close Orion
  const openOrion = () => {
    ballBtn.classList.add('orion-hidden');
    wrapper.classList.remove('orion-collapsed');
    wrapper.classList.add('orion-expanded');
    if (widget && widget.shadowRoot) {
      setupShadowRoot(widget.shadowRoot);
    }
  };

  const closeOrion = () => {
    wrapper.classList.remove('orion-expanded');
    wrapper.classList.add('orion-collapsed');
    ballBtn.classList.remove('orion-hidden');
  };

  ballBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openOrion();
  });

  const createCloseBtn = () => {
    const btn = document.createElement('button');
    btn.className = 'orion-close-cross-btn';
    btn.setAttribute('aria-label', 'Close Orion Assistant');
    btn.setAttribute('title', 'Close');
    btn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeOrion();
    });
    return btn;
  };

  const widget = document.createElement('elevenlabs-convai');
  widget.id = ID;
  // Ensure we have the latest value for AGENT_ID (if a script tag provided an override)
  tryReadAgentFromScriptTag();

  if (!AGENT_ID) {
    console.warn('[ElevenLabs ConvAI] No agent id found. Please set window.ELEVENLABS_AGENT_ID, add data-agent-id to the script tag, or edit this file.');
    return;
  }

  // Debug: print where the agent id was resolved from
  try {
    const scriptEl = document.getElementById('eleven-ai') || Array.from(document.getElementsByTagName('script')).find(s => s.src && s.src.includes('/ai/ai.js'));
    console.debug('[ElevenLabs ConvAI] Resolved AGENT_ID:', AGENT_ID);
    console.debug('[ElevenLabs ConvAI] window.ELEVENLABS_AGENT_ID =', typeof window !== 'undefined' ? window.ELEVENLABS_AGENT_ID : undefined);
    console.debug('[ElevenLabs ConvAI] script data-agent-id =', scriptEl && scriptEl.dataset ? scriptEl.dataset.agentId : undefined);
  } catch (e) {
    // ignore logging errors
  }

  widget.setAttribute('agent-id', AGENT_ID);

  // Observe the widget element for attribute changes so we can detect if something overwrites the agent-id
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      if (m.type === 'attributes' && m.attributeName === 'agent-id') {
        const newVal = widget.getAttribute('agent-id');
        console.warn('[ElevenLabs ConvAI] Detected agent-id attribute change ->', newVal);
        console.debug('[ElevenLabs ConvAI] Current window.ELEVENLABS_AGENT_ID =', typeof window !== 'undefined' ? window.ELEVENLABS_AGENT_ID : undefined);
        try {
          console.debug('[ElevenLabs ConvAI] script data-agent-id =', scriptEl && scriptEl.dataset ? scriptEl.dataset.agentId : undefined);
        } catch (e) {}
      }
    });
  });

  observer.observe(widget, { attributes: true });
  widget.setAttribute('variant', 'full');

  // Register the widget's client tool for external redirects. The embed may look up this
  // tool by different casing/keys, so register multiple variants on the widget and a
  // global container. This makes the handler discoverable regardless of the name used.
  const makeRedirectHandler = () => ({ url }) => {
    //console.log('redirectToExternalURL called with url:', url);

    if (!url || typeof url !== 'string') return;

    // Trim and normalize whitespace (speech-to-text often inserts spaces)
    let raw = url.trim();
    // Replace consecutive whitespace with single hyphen to better match slug patterns
    // e.g. 'virtual reality' -> 'virtual-reality'
    raw = raw.replace(/\s+/g, '-');

    // Helper to strip trailing slash from base
    const baseOrigin = (BASE_URL && BASE_URL.length > 0 ? BASE_URL : window.location.origin).replace(/\/$/, '');

    let fullUrl;
    // Absolute URL (with protocol)
    if (/^https?:\/\//i.test(raw)) {
      fullUrl = raw;
    } else if (raw.startsWith('/')) {
      // Root-relative path -> attach to origin/base
      fullUrl = baseOrigin + raw;
    } else if (/^\.|^\.\./.test(raw)) {
      // Relative path using ./ or ../ -> resolve against current location
      try {
        fullUrl = new URL(raw, window.location.href).toString();
      } catch (e) {
        fullUrl = baseOrigin + '/' + raw;
      }
    } else {
      // No leading slash -> treat as root-relative (most voice commands refer to top-level routes)
      fullUrl = baseOrigin + '/' + raw;
    }

    //console.log('Navigating to:', fullUrl);

    // Navigate based on config
    if (OPEN_IN_NEW_TAB) {
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = fullUrl;
    }
  };

  const redirectHandler = makeRedirectHandler();

  // Preferred name (camelCase) and several common variants the embed might use
  const clientToolNames = [
    'redirectToExternalURL',
    'redirecttoExternalURL',
    'redirectToExternalUrl',
    'redirecttoExternalUrl',
    'redirecttoexternalurl'
  ];

  // Attach to event.detail.config when the embed fires 'call' (keeps previous behaviour)
  widget.addEventListener('elevenlabs-convai:call', (event) => {
    try {
      event.detail = event.detail || {};
      event.detail.config = event.detail.config || {};
      event.detail.config.clientTools = event.detail.config.clientTools || {};
      for (const name of clientToolNames) {
        event.detail.config.clientTools[name] = redirectHandler;
      }
      // Attempt to tell the widget to hide the provider banner via config.
      // The server may override this; it's a best-effort client-side request.
      try {
        // Support multiple possible keys the embed may inspect
        event.detail.config.widget_config = event.detail.config.widget_config || {};
        event.detail.config.widget_config.disable_banner = true;
        event.detail.config.widgetConfig = event.detail.config.widgetConfig || {};
        event.detail.config.widgetConfig.disable_banner = true;
        // also set a top-level flag in case the embed looks there
        event.detail.config.disable_banner = true;
      } catch (e) {
        console.warn('failed to set disable_banner on event config', e);
      }
    } catch (e) {
      console.warn('failed to attach clientTools to event.detail:', e);
    }
  });

  // Also expose on the widget element directly
  try {
    widget.clientTools = widget.clientTools || {};
    for (const name of clientToolNames) {
      widget.clientTools[name] = redirectHandler;
    }
  } catch (e) {
    console.warn('failed to set widget.clientTools:', e);
  }

  // And expose a global registry in case the embed checks there
  try {
    window.ELEVENLABS_CONVAI_CLIENT_TOOLS = window.ELEVENLABS_CONVAI_CLIENT_TOOLS || {};
    for (const name of clientToolNames) {
      window.ELEVENLABS_CONVAI_CLIENT_TOOLS[name] = redirectHandler;
    }
  } catch (e) {
    console.warn('failed to set global ELEVENLABS_CONVAI_CLIENT_TOOLS:', e);
  }

  // Helper function to setup styling, top-right close button, and eradicate Powered-By branding in shadowRoot
  function setupShadowRoot(shadow) {
    if (!shadow) return;

    // 1. Inject styles directly into shadowRoot
    if (!shadow.getElementById('orion-shadow-styles')) {
      const style = document.createElement('style');
      style.id = 'orion-shadow-styles';
      style.textContent = `
        p, 
        a[href*="elevenlabs"],
        .overlay:not(:has(.rounded-sheet)):not(:has([class*="sheet"])) {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          width: 0 !important;
          max-height: 0 !important;
          max-width: 0 !important;
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
          pointer-events: none !important;
          opacity: 0 !important;
        }
        .rounded-sheet, .sheet, [class*="sheet"] {
          position: relative !important;
        }
        .orion-close-cross-btn {
          position: absolute !important;
          top: 10px !important;
          right: 12px !important;
          width: 24px !important;
          height: 24px !important;
          border-radius: 50% !important;
          background: rgba(0, 43, 35, 0.75) !important;
          border: 1px solid rgba(156, 229, 208, 0.4) !important;
          color: #ffffff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          padding: 0 !important;
          margin: 0 !important;
          z-index: 2147483647 !important;
          transition: all 0.2s ease !important;
          backdrop-filter: blur(6px) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
          box-sizing: border-box !important;
          line-height: 1 !important;
        }
        .orion-close-cross-btn:hover {
          background: rgba(0, 43, 35, 0.95) !important;
          border-color: #a4efe0 !important;
          transform: scale(1.1) !important;
          color: #a4efe0 !important;
        }
        .orion-close-cross-btn svg {
          width: 12px !important;
          height: 12px !important;
          stroke: currentColor !important;
        }
      `;
      shadow.appendChild(style);
    }

    // 2. Remove any powered-by nodes and their parent overlay container
    try {
      const poweredNodes = shadow.querySelectorAll('p, a[href*="elevenlabs"]');
      poweredNodes.forEach(el => {
        const parentOverlay = el.closest('.overlay');
        const sheetOverlay = shadow.querySelector('.rounded-sheet, .sheet, [class*="sheet"]')?.closest('.overlay');
        if (parentOverlay && parentOverlay !== sheetOverlay) {
          parentOverlay.style.setProperty('display', 'none', 'important');
          try { parentOverlay.remove(); } catch (e) {}
        } else {
          el.style.setProperty('display', 'none', 'important');
          try { el.remove(); } catch (e) {}
        }
      });
    } catch (e) {}

    // 3. Ensure close cross button is placed at top-right inside sheet
    try {
      const sheet = shadow.querySelector('.rounded-sheet, .sheet, [class*="sheet"]');
      if (sheet) {
        sheet.style.setProperty('position', 'relative', 'important');
        if (!sheet.querySelector('.orion-close-cross-btn')) {
          const btn = createCloseBtn();
          sheet.appendChild(btn);
        }
      }
    } catch (e) {}
  }

  // Attach assistive ball and card wrapper to the DOM
  document.body.appendChild(ballBtn);
  wrapper.appendChild(widget);
  document.body.appendChild(wrapper);

  // Connect shadow root observer to manage close button and brand styling
  let shadowObserver = null;
  function connectShadowRootObserver() {
    if (widget && widget.shadowRoot) {
      setupShadowRoot(widget.shadowRoot);
      if (!shadowObserver) {
        shadowObserver = new MutationObserver(() => {
          setupShadowRoot(widget.shadowRoot);
        });
        shadowObserver.observe(widget.shadowRoot, { childList: true, subtree: true });
      }
      return true;
    }
    return false;
  }

  if (!connectShadowRootObserver()) {
    const checkInterval = setInterval(() => {
      if (connectShadowRootObserver()) {
        clearInterval(checkInterval);
      }
    }, 100);
    setTimeout(() => clearInterval(checkInterval), 10000);
  }

  const docObserver = new MutationObserver(() => {
    connectShadowRootObserver();
  });
  docObserver.observe(document.body, { childList: true, subtree: true });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectElevenLabsWidget);
} else {
  injectElevenLabsWidget();
}