
Matter = {};
Matter.Body = require('./body/Body');
Matter.Composite = require('./body/Composite');
Matter.World = require('./body/World');

Matter.Contact = require('./collision/Contact');
Matter.Detector = require('./collision/Detector');
Matter.Grid = require('./collision/Grid');
Matter.Pairs = require('./collision/Pairs');
Matter.Pair = require('./collision/Pair');
Matter.Query = require('./collision/Query');
Matter.Resolver = require('./collision/Resolver');
Matter.SAT = require('./collision/SAT');

Matter.Constraint = require('./constraint/Constraint');
Matter.MouseConstraint = require('./constraint/MouseConstraint');

Matter.Common = require('./core/Common');
Matter.Engine = require('./core/Engine');
Matter.Events = require('./core/Events');
Matter.Metrics = require('./core/Metrics');
Matter.Mouse = require('./core/Mouse');
Matter.Runner = require('./core/Runner');
Matter.Engine.run = Matter.Runner.run;
Matter.Sleeping = require('./core/Sleeping');

Matter.Bodies = require('./factory/Bodies');
Matter.Composites = require('./factory/Composites');

Matter.Axes = require('./geometry/Axes');
Matter.Bounds = require('./geometry/Bounds');
Matter.Vector = require('./geometry/Vector');
Matter.Vertices = require('./geometry/Vertices');

Matter.Render = require('./render/Render');
Matter.RenderPixi = require('./render/RenderPixi');

module.exports = Matter;
