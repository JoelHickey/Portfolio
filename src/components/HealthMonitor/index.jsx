import { useState, useCallback } from 'react';
import './win95.css';
import Header from './Header';
import Toolbar from './Toolbar';
import Slider from './Slider';
import StatusBar from './StatusBar';
import CheckboxGroup from './CheckboxGroup';
import Timeline from './Timeline';
import Divider from './Divider';
import { useSliderDrag } from './useSliderDrag';
import { INPUT_SLIDERS, EMOTION_SLIDERS } from './constants';

const initialSliderValues = {
  sleepQuality: 0,
  waterLevel: 0,
  caffeineLevel: 0,
  foodLevel: 0,
  walkLevel: 0,
  squatsLevel: 0,
  alcoholLevel: 0,
  vitaminD: 0,
  vitaminB12: 0,
  vitaminC: 0,
  magnesium: 0,
  lTheanine: 0,
  happiness: 0,
  anxiety: 0,
  energy: 0,
  focus: 0,
  stress: 0,
  sadness: 0,
  anger: 0,
  irritability: 0,
  dread: 0
};

const initialEnvironmentCheckboxes = {
  noise: false,
  lighting: false,
  temperature: false,
  crowding: false,
  airQuality: false,
  cleanliness: false
};

function HealthMonitor() {
  const [activeView, setActiveView] = useState('inputs');
  const [isFlipView, _setIsFlipView] = useState(false);
  const [sliderValues, setSliderValues] = useState(initialSliderValues);
  const [environmentCheckboxes, setEnvironmentCheckboxes] = useState(initialEnvironmentCheckboxes);
  const [timelineEvents, setTimelineEvents] = useState([]);

  const handleSliderChange = useCallback((name, value) => {
    setSliderValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSliderMouseDown = useSliderDrag();

  const updateEnvironmentCheckbox = useCallback((name, checked) => {
    setEnvironmentCheckboxes((prev) => ({ ...prev, [name]: checked }));
  }, []);

  const addTimelineEvent = useCallback((event) => {
    setTimelineEvents((prev) => [...prev, event]);
  }, []);

  const deleteTimelineEvent = useCallback((index) => {
    setTimelineEvents((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const renderSliderRow = useCallback(
    (sliders, align = 'center') => (
      <div
        style={{
          display: 'flex',
          gap: '6px',
          justifyContent: align,
          alignItems: 'flex-start',
          width: 'max-content',
          minWidth: '100%',
          position: 'relative',
          minHeight: sliders.length > 10 ? '380px' : '220px',
          overflow: 'visible'
        }}
      >
        {sliders.flatMap((slider, index) => {
          const value = sliderValues[slider.name] ?? 0;
          const caffeineMg = slider.name === 'caffeineLevel' ? Math.round(value * 95) : null;
          const waterMl = slider.name === 'waterLevel' ? Math.round(value * 300) : null;
          const sliderEl = (
            <Slider
              key={slider.name}
              value={value}
              onChange={(v) => handleSliderChange(slider.name, v)}
              onMouseDown={handleSliderMouseDown}
              label={slider.label}
              unit={slider.unit}
              multiplier={slider.multiplier ?? 1}
              caffeineMg={caffeineMg}
              waterMl={waterMl}
            />
          );
          return index < sliders.length - 1 ? [sliderEl, <Divider key={`div-${slider.name}`} />] : [sliderEl];
        })}
      </div>
    ),
    [sliderValues, handleSliderChange, handleSliderMouseDown]
  );

  const renderWiringDiagram = () => {
    const wiringNodes = [
      { id: 'inputs', label: 'Inputs', x: 16, y: 30, color: '#9fd3ff', outputs: 3 },
      { id: 'emotions', label: 'Emotions', x: 16, y: 70, color: '#ffb3c7', outputs: 3 },
      { id: 'environment', label: 'Environment', x: 40, y: 50, color: '#b9f6ca', outputs: 3 },
      { id: 'timeline', label: 'Timeline', x: 64, y: 30, color: '#ffe0a3', outputs: 3 },
      { id: 'output', label: 'Output Bus', x: 82, y: 62, color: '#d6d0ff', inputs: 4, outputs: 1 },
      { id: 'status', label: 'Status Bar', x: 82, y: 84, color: '#c8c8c8', inputs: 1 }
    ];
    const wiringCables = [
      { from: 'inputs', fromPort: 0, to: 'output', toPort: 0, color: '#7ad3ff' },
      { from: 'emotions', fromPort: 1, to: 'output', toPort: 1, color: '#ff7aa7' },
      { from: 'environment', fromPort: 2, to: 'output', toPort: 2, color: '#65d69e' },
      { from: 'timeline', fromPort: 0, to: 'output', toPort: 3, color: '#f4c26b' },
      { from: 'output', fromPort: 0, to: 'status', toPort: 0, color: '#9fa0ff' }
    ];
    const getNode = (id) => wiringNodes.find((n) => n.id === id);
    const spreadOffsets = (count, spacing) => {
      if (count <= 1) return [0];
      const mid = (count - 1) / 2;
      return Array.from({ length: count }, (_, i) => (i - mid) * spacing);
    };
    const buildNodePorts = (node) => {
      const ports = { inputs: [], outputs: [] };
      const spacing = 3;
      if (node.inputs) {
        spreadOffsets(node.inputs, spacing).forEach((offset, index) => {
          ports.inputs.push({ id: `${node.id}-in-${index}`, x: node.x - 7, y: node.y + offset });
        });
      }
      if (node.outputs) {
        spreadOffsets(node.outputs, spacing).forEach((offset, index) => {
          ports.outputs.push({ id: `${node.id}-out-${index}`, x: node.x + 7, y: node.y + offset });
        });
      }
      return ports;
    };
    const nodePorts = Object.fromEntries(wiringNodes.map((n) => [n.id, buildNodePorts(n)]));
    const buildCablePath = (fromPort, toPort) => {
      const { x: x1, y: y1 } = fromPort;
      const { x: x2, y: y2 } = toPort;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const sag = Math.min(18, Math.max(8, Math.hypot(dx, dy) * 0.18));
      const c1x = (x1 + midX) / 2;
      const c1y = (y1 + midY) / 2 + sag * 0.12;
      const c2x = (x2 + midX) / 2;
      const c2y = (y2 + midY) / 2 + sag * 0.12;
      return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
    };

    const shellStyles = {
      panel: {
        padding: '8px',
        width: '100%',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      },
      header: {
        fontSize: '9px',
        fontFamily: "'MS Sans Serif', sans-serif",
        color: '#ffffff',
        letterSpacing: '0.4px',
        textTransform: 'uppercase'
      },
      canvas: {
        position: 'relative',
        flex: 1,
        background: 'linear-gradient(180deg, #2f2f2f 0%, #1f1f1f 100%)',
        border: '2px inset #808080',
        borderRadius: '6px',
        overflow: 'hidden'
      },
      node: (color) => ({
        position: 'absolute',
        width: '128px',
        height: '44px',
        background: '#111111',
        border: `1px solid ${color}`,
        boxShadow: `0 0 0 1px #000000 inset, 0 0 10px ${color}40`,
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '6px 8px',
        color: '#eaeaea',
        fontSize: '9px',
        fontFamily: "'MS Sans Serif', sans-serif",
        textTransform: 'uppercase',
        letterSpacing: '0.3px',
        transform: 'translate(-50%, -50%)'
      }),
      portDot: (color) => ({
        position: 'absolute',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: color,
        border: '1px solid #050505',
        boxShadow: `0 0 4px ${color}`,
        transform: 'translate(-50%, -50%)'
      }),
      portLayer: { position: 'absolute', inset: 0, pointerEvents: 'none' }
    };

    return (
      <div style={shellStyles.panel} aria-label="Shell wiring diagram">
        <div style={shellStyles.header}>Shell Wiring View</div>
        <div style={{ ...shellStyles.canvas, position: 'relative', minHeight: 200 }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute', inset: 0 }}
          >
            {wiringCables.map((cable) => {
              const fromNode = getNode(cable.from);
              const toNode = getNode(cable.to);
              if (!fromNode || !toNode) return null;
              const fromPort = nodePorts[cable.from]?.outputs?.[cable.fromPort];
              const toPort = nodePorts[cable.to]?.inputs?.[cable.toPort];
              if (!fromPort || !toPort) return null;
              const path = buildCablePath(fromPort, toPort);
              return (
                <path
                  key={`${cable.from}-${cable.to}`}
                  d={path}
                  fill="none"
                  stroke={cable.color}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />
              );
            })}
          </svg>
          <div style={shellStyles.portLayer}>
            {wiringNodes.flatMap((node) => [
              ...(nodePorts[node.id]?.inputs ?? []).map((port) => ({ ...port, color: node.color })),
              ...(nodePorts[node.id]?.outputs ?? []).map((port) => ({ ...port, color: node.color }))
            ]).map((port) => (
              <span
                key={port.id}
                style={{
                  ...shellStyles.portDot(port.color),
                  left: `${port.x}%`,
                  top: `${port.y}%`
                }}
              />
            ))}
          </div>
          {wiringNodes.map((node) => (
            <div
              key={node.id}
              style={{
                ...shellStyles.node(node.color),
                left: `${node.x}%`,
                top: `${node.y}%`
              }}
            >
              {node.label}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderViewContent = () => {
    if (isFlipView) return renderWiringDiagram();

    switch (activeView) {
      case 'inputs':
        return (
          <div
            style={{
              padding: '8px',
              width: '100%',
              height: '300px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              overflowX: 'hidden',
              overflowY: 'hidden'
            }}
          >
            {renderSliderRow(INPUT_SLIDERS, 'flex-start')}
          </div>
        );
      case 'emotions':
        return (
          <div
            style={{
              padding: '8px',
              width: '100%',
              height: '300px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              overflowX: 'hidden',
              overflowY: 'hidden'
            }}
          >
            {renderSliderRow(EMOTION_SLIDERS, 'flex-start')}
          </div>
        );
      case 'environment': {
        const envConfig = [
          { name: 'noise', label: 'Noise', checked: environmentCheckboxes.noise, onChange: (c) => updateEnvironmentCheckbox('noise', c) },
          { name: 'lighting', label: 'Lighting', checked: environmentCheckboxes.lighting, onChange: (c) => updateEnvironmentCheckbox('lighting', c) },
          { name: 'temperature', label: 'Temperature', checked: environmentCheckboxes.temperature, onChange: (c) => updateEnvironmentCheckbox('temperature', c) },
          { name: 'crowding', label: 'Crowding', checked: environmentCheckboxes.crowding, onChange: (c) => updateEnvironmentCheckbox('crowding', c) },
          { name: 'airQuality', label: 'Air Quality', checked: environmentCheckboxes.airQuality, onChange: (c) => updateEnvironmentCheckbox('airQuality', c) },
          { name: 'cleanliness', label: 'Cleanliness', checked: environmentCheckboxes.cleanliness, onChange: (c) => updateEnvironmentCheckbox('cleanliness', c) }
        ];
        return (
          <div
            style={{
              padding: '8px',
              width: '100%',
              height: '300px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              overflow: 'hidden'
            }}
          >
            <CheckboxGroup checkboxes={envConfig} columns={3} />
          </div>
        );
      }
      case 'timeline':
        return (
          <div
            style={{
              padding: '8px',
              width: '100%',
              height: '300px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              overflow: 'hidden'
            }}
          >
            <Timeline
              events={timelineEvents}
              onAddEvent={addTimelineEvent}
              onDeleteEvent={deleteTimelineEvent}
            />
          </div>
        );
      case 'about':
        return (
          <div
            style={{
              padding: '8px',
              width: '100%',
              height: '300px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: '100%',
                background: '#d4d0c8',
                border: '2px inset #c0c0c0',
                padding: '8px',
                fontSize: '8pt',
                fontFamily: "'MS Sans Serif', sans-serif"
              }}
            >
              <strong>Mental Health Monitor (Earth)</strong>
              <p style={{ marginTop: '8px', marginBottom: '4px' }}>
                Track sleep, emotions, environment, and habits in a Windows 95–style interface.
              </p>
              <p style={{ margin: '4px 0' }}>Inputs → Emotions → Environment → Timeline → Output</p>
              <p style={{ margin: '4px 0', color: '#000080' }}>Built for the FCTG AI Talk portfolio.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const outputValue = 5;

  return (
    <div className="health-monitor win95-scope win95-ui" style={{ minHeight: '100%', width: '100%', background: '#d4d0c8' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 420,
          border: '2px solid #808080',
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          boxShadow: 'inset 1px 1px 0 #ffffff, 2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        <Header embed title="Earth" iconSrc="/health-icons/Earth.ico" />
        <Toolbar
          activeView={activeView}
          setActiveView={setActiveView}
          outputValue={outputValue}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: '#d4d0c8'
          }}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>{renderViewContent()}</div>
          </div>
        </div>
        <StatusBar caffeineLevel={sliderValues.caffeineLevel} sliderValues={sliderValues} />
      </div>
    </div>
  );
}

export default HealthMonitor;
